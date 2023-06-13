import { faker } from "@faker-js/faker";
import User, { UserAttributes } from "../../models/user.model";
import Club, { Club_User } from "../../models/club.model";
import Rank, { Rank_User } from "../../models/rank.model";
import Award, { Award_User } from "../../models/award.model";
import Star, { Star_User } from "../../models/star.model";
import Scoresheet from "../../models/scoresheet.model";
import Style, { StyleAttributes } from "../../models/style.model";

import categoryList from "../../util/categoryList.util";
import evalRank from "../../util/evalRank.util";
import evalAward from "../../util/evalAward.util";

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

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
  paymentExpiry: faker.date.future(),
};

const createRandomUser = (): UserAttributes => {
  const isPaid = Boolean(Math.round(Math.random()));

  return {
    id: faker.string.uuid(),
    email: faker.internet.email().toLocaleLowerCase(),
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
    paymentExpiry: isPaid ? faker.date.future() : undefined,
  };
};

export const runUserSeeds = async (clubs?: Club[]) => {
  console.log("Seeding User table...");

  const allAwards = await Award.findAll();
  const allRanks = await Rank.findAll();

  const users = await User.bulkCreate(
    [
      ...faker.helpers.multiple(createRandomUser, {
        count: 50,
      }),
      adminUser,
    ],
    {
      ignoreDuplicates: true,
      individualHooks: true,
    }
  );

  await Promise.all(
    users.map(async (user, idx) => {
      // Assign User to a Club
      console.log("--Assigning User to Club...");
      const randomClub = clubs[Math.floor(clubs.length * Math.random())];
      await Club_User.create({
        //@ts-expect-error ClubId not exposed
        ClubId: randomClub.id,
        UserId: user.id,
      });

      // Assign stars (weighted probability)
      console.log("--Assigning User Stars...");
      const numStars = [0, 0, 0, 0, 0, 1, 1, 1, 2, 3][
        Math.floor(10 * Math.random())
      ];
      const stars = await Star.findAll();
      await Promise.all(
        Array(numStars)
          .fill(null)
          .map(async () => {
            const randomId = Math.floor(stars.length * Math.random());

            return await Star_User.create({
              description: faker.company.catchPhrase(),
              //@ts-expect-error StarId not exposed
              StarId: stars[randomId].id,
              UserId: user.id,
            }).catch((err) => console.log);
          })
      );

      // Generate scoresheets
      console.log("--Generating User Scoresheets...");
      if (idx < allAwards.length) {
        // Manually create a user with scoresheets to trigger each award
        await user.update({
          fname: allAwards[idx].name,
        });

        const currentAwardCategoryList = allAwards[idx].categoryList;
        console.log(
          "----Generating " + allAwards[idx].name + " Award scoresheets"
        );

        await Promise.all(
          currentAwardCategoryList.map(async (category) => {
            const score = 45;

            const style = await Style.findOne({
              where: {
                cat: category.slice(0, category.includes("21B") ? -2 : -1),
                subcat: category.slice(category.includes("21B") ? -2 : -1),
              },
            });

            if (!style) {
              console.log("MISSING STYLE " + category);
            }

            return await Scoresheet.create({
              score,
              approved: true,

              //@ts-expect-error StyleId not exposed
              StyleId: style.id,
              UserId: user.id,
            });
          })
        );
      } else if (idx < allAwards.length + allRanks.length - 1) {
        // Manually create a user with scoresheets to trigger each rank
        const currentRank = allRanks[idx - allAwards.length];
        console.log("----Generating " + currentRank.name + " Rank scoresheets");

        await user.update({
          fname: currentRank.name,
        });

        const catStrings: Partial<StyleAttributes>[] = [];

        if (currentRank.minCiders) {
          const ciderCats = shuffle(categoryList.filter((cat) => cat.isCider));
          catStrings.push(...ciderCats.slice(currentRank.minCiders));
        }

        if (currentRank.minLagers) {
          const lagerCats = shuffle(categoryList.filter((cat) => cat.isLager));
          catStrings.push(...lagerCats.slice(currentRank.minLagers));
        }

        if (currentRank.minMeads) {
          const meadCats = shuffle(categoryList.filter((cat) => cat.isMead));
          catStrings.push(...meadCats.slice(currentRank.minMeads));
        }

        if (currentRank.minSours) {
          const sourCats = shuffle(categoryList.filter((cat) => cat.isSour));
          catStrings.push(...sourCats.slice(currentRank.minSours));
        }

        if (currentRank.minMixedSours) {
          const mixedSourCats = shuffle(
            categoryList.filter((cat) => cat.cat === "28")
          );
          catStrings.push(...mixedSourCats.slice(currentRank.minMixedSours));
        }

        if (currentRank.minSlmc) {
          const slmcCats = shuffle(
            categoryList.filter(
              (cat) => cat.isSour || cat.isCider || cat.isLager || cat.isMead
            )
          );
          catStrings.push(...slmcCats.slice(currentRank.minSlmc));
        }

        const normalCats = shuffle(
          categoryList.filter(
            (cat) => !cat.isSour && !cat.isCider && !cat.isLager && !cat.isMead
          )
        );
        catStrings.push(
          ...normalCats.slice(catStrings.length, currentRank.minSubcats + 1)
        );

        const currentCats = Object.keys(
          catStrings.reduce((acc, cat) => {
            acc[cat.cat] = true;
            return acc;
          }, {})
        );

        if (currentCats.length < currentRank.minCats) {
          const numNeeded = currentRank.minCats - currentCats.length;
          const allcats = Object.keys(
            categoryList.reduce((acc, cat) => {
              acc[cat.cat] = true;
              return acc;
            }, {})
          );
          const remainingCats: string[] = shuffle(
            allcats.filter((cat) => !currentCats.includes(cat))
          );

          catStrings.push(
            ...remainingCats
              .slice(0, numNeeded)
              .map((targetCat) =>
                categoryList.find((cat) => cat.cat === targetCat)
              )
          );
        }

        await Promise.all(
          catStrings.map(async (category) => {
            const score = currentRank.minScore + 1;

            const style = await Style.findOne({
              where: {
                cat: category.cat,
                subcat: category.subcat,
              },
            });

            return await Scoresheet.create({
              score,
              approved: true,

              //@ts-expect-error StyleId not exposed
              StyleId: style.id,
              UserId: user.id,
            });
          })
        );
      } else {
        const numScoresheets = Math.floor(5 + 60 * Math.random());
        await Promise.all(
          Array(numScoresheets)
            .fill(null)
            .map(async () => {
              const category =
                categoryList[Math.floor(categoryList.length * Math.random())];
              const score = Math.round(20 + 30 * Math.random());

              const style = await Style.findOne({
                where: {
                  cat: category.cat,
                  subcat: category.subcat,
                },
              });

              return await Scoresheet.create({
                score,
                approved: Boolean(Math.round(Math.random())),

                //@ts-expect-error StyleId not exposed
                StyleId: style.id,
                UserId: user.id,
              });
            })
        );
      }

      // Create entries in Rank_Users table
      console.log("--Generating User Rank Entries...");
      const ranks = await Rank.findAll();
      const userRanks = await Promise.all(
        ranks.map((rank) => {
          return Rank_User.create({
            //@ts-expect-error RankId not exposed
            RankId: rank.id,
            UserId: user.id,
          });
        })
      );

      // Evaluate ranks in Rank_Users table
      console.log("--Evaluating User Rank Entries...");
      await Promise.all(
        userRanks.map(async (userRank) => {
          const scoresheets = (await Scoresheet.findAll({
            //@ts-expect-error UserId not exposed
            where: { UserId: user.id },
            include: Style,
          })) as (Scoresheet & { Style: Style })[];

          const rank = await Rank.findOne({
            //@ts-expect-error RankId not exposed
            where: { id: userRank.RankId },
          });

          const rankProgress = evalRank(scoresheets, rank);

          await userRank.update({
            achieved: rankProgress.achieved,
            achievedAt: rankProgress.achieved ? new Date() : undefined,
            requirements: rankProgress.requirements,
          });
        })
      );

      // Create entries in Award_Users table
      console.log("--Generating User Award Entries...");
      const awards = await Award.findAll();
      const userAwards = await Promise.all(
        awards.map((award) => {
          return Award_User.create({
            //@ts-expect-error AwardId not exposed
            AwardId: award.id,
            UserId: user.id,
          });
        })
      );

      // Evaluate awards in Award_Users table
      console.log("--Evaluating User Award Entries...");
      await Promise.all(
        userAwards.map(async (userAward) => {
          const scoresheets = (await Scoresheet.findAll({
            //@ts-expect-error UserId not exposed
            where: { UserId: user.id },
            include: Style,
          })) as (Scoresheet & { Style: Style })[];

          const award = await Award.findOne({
            //@ts-expect-error RankId not exposed
            where: { id: userAward.AwardId },
          });

          const awardProgress = evalAward(scoresheets, award);

          await userAward.update({
            achieved: awardProgress.achieved,
            achievedAt: awardProgress.achieved ? new Date() : undefined,
            requirements: awardProgress.requirements,
          });
        })
      );
    })
  );

  return users;
};
