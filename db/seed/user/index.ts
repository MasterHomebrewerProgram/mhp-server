import { faker } from '@faker-js/faker';
import User, { UserAttributes } from '../../models/user.model';
import Club, { Club_User } from '../../models/club.model';
import Rank, { Rank_User } from '../../models/rank.model';
import Award, { Award_User } from '../../models/award.model';
import Star, { Star_User } from '../../models/star.model';
import Scoresheet from '../../models/scoresheet.model';
import categoryList from '../../util/categoryList.util';
import evalRank from '../../util/evalRank.util'
import Style from '../../models/style.model';

const adminUser = {
  id: faker.string.uuid(),
  email: "admin@gmail.com",
  slug: "admin",
  fname: "Admin",
  lname: "User",
  photourl: faker.image.urlLoremFlickr(),
  bio: faker.person.bio(),
  address1: faker.location.streetAddress(),
  city: faker.location.city(),
  province: faker.location.state(),
  postalCode: faker.location.zipCode(),
  country: "US",

  password: "password",
  adminLevel: 0,
  emailVerified: true,

  paid: true,
  paymentId: faker.string.uuid(),
  paymentDate: faker.date.past(),
  paymentExpiry: faker.date.future()
}

const createRandomUser = (): UserAttributes => {
  const isPaid = Boolean(Math.round(Math.random()))

  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    slug: faker.string.uuid(),
    fname: faker.person.firstName(),
    lname: faker.person.lastName(),
    photourl: faker.image.urlLoremFlickr(),
    bio: faker.person.bio(),
    address1: faker.location.streetAddress(),
    city: faker.location.city(),
    province: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: "US",

    password: "password",
    adminLevel: 0,
    emailVerified: true,

    paid: isPaid,
    paymentId: isPaid ? faker.string.uuid() : undefined,
    paymentDate: isPaid ? faker.date.past() : undefined,
    paymentExpiry: isPaid ? faker.date.future() : undefined
  }
}

export const runUserSeeds = async (clubs?: Club[]) => {
  console.log("Seeding User table...")

  const users = await User.bulkCreate([
    adminUser,
    ...faker.helpers.multiple(createRandomUser, {
      count: 50
    })
  ], {
    ignoreDuplicates: true,
    individualHooks: true
  })

  await Promise.all(
    users.map(async (user, idx) => {
      // Assign User to a Club
      console.log("--Assigning User to Club...")
      const randomClub = clubs[Math.floor(clubs.length*Math.random())]
      await Club_User.create({
        //@ts-expect-error ClubId not exposed
        ClubId: randomClub.id,
        UserId: user.id
      })

      // Assign stars (weighted probability)
      console.log("--Assigning User Stars...")
      const numStars = [0, 0, 0, 0, 0, 1, 1, 1, 2, 3][Math.floor(10*Math.random())]
      const stars = await Star.findAll()
      await Promise.all(
        Array(numStars).fill(null).map(async () => {
          const randomId = Math.floor(stars.length * Math.random())

          return await Star_User.create({
            description: faker.company.catchPhrase(),
            //@ts-expect-error StarId not exposed
            "StarId": stars[randomId].id,
            "UserId": user.id
          })
          .catch(err => console.log)
        })
      )

      // Generate scoresheets
      console.log("--Generating User Scoresheets...")
      const numScoresheets = Math.floor(5+60*Math.random())
      const userScoresheets = await Promise.all(
        Array(numScoresheets).fill(null).map(async () => {
          const category = categoryList[Math.floor(categoryList.length * Math.random())]
          const score = Math.round(20+30*Math.random())

          const style = await Style.findOne({
            where: {
              cat: category.cat,
              subcat: category.subcat
            }
          })

          return await Scoresheet.create({
            score,
            approved: Boolean(Math.round(Math.random())),

            //@ts-expect-error StyleId not exposed
            StyleId: style.id,
            UserId: user.id
          })
        })
      )

      // Create entries in Rank_Users table
      console.log("--Generating User Rank Entries...")
      const ranks = await Rank.findAll()
      const userRanks = await Promise.all(
        ranks.map(rank => {
          return Rank_User.create({
            //@ts-expect-error RankId not exposed
            RankId: rank.id,
            UserId: user.id
          })
        })
      )

      // Evaluate ranks in Rank_Users table
      console.log("--Evaluating User Rank Entries...")
      userRanks.map(async (userRank, idx2) => {
        const scoresheets = await Scoresheet.findAll({
          //@ts-expect-error UserId not exposed
          where: {"UserId": user.id},
          include: Style
        }) as (Scoresheet & { Style: Style; })[]

        const rank = await Rank.findOne({
          //@ts-expect-error RankId not exposed
          where: {id: userRank.RankId}
        })

        const rankProgress = evalRank(scoresheets, rank)

        userRank.update({
          achieved: rankProgress.achieved
        })
      })

      // Create entries in Award_Users table
      console.log("--Generating User Award Entries...")
      const awards = await Award.findAll()
      const userAwards = await Promise.all(
        awards.map(award => {
          return Award_User.create({
            //@ts-expect-error AwardId not exposed
            AwardId: award.id,
            UserId: user.id
          })
        })
      )

      // Evaluate awards in Award_Users table

    })
  )
}