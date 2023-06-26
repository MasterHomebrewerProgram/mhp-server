import { faker } from "@faker-js/faker";
import Club, { ClubAttributes } from "../models/club.model";
import Comp, { CompAttributes } from "../models/comp.model";

const createRandomClub = (): ClubAttributes => {
  const isPaid = Boolean(Math.round(Math.random()));

  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    slug: faker.string.uuid(),
    url: faker.internet.url(),
    photourl: faker.image.urlLoremFlickr(),
    bio: faker.person.bio(),
    city: faker.location.city(),
    province: faker.location.state(),
    country: "US",

    paid: isPaid,
    paymentId: isPaid ? faker.string.uuid() : undefined,
    paymentDate: isPaid ? faker.date.past() : undefined,
    paymentExpiry: isPaid ? faker.date.future() : undefined,
  };
};

const createRandomComp = (
  compName = `${faker.company.buzzAdjective} ${faker.company.buzzNoun}`,
  year = 2023,
  city = faker.location.city(),
  province = faker.location.state(),
  country = "US"
): CompAttributes => {
  const futureDate = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * (30 + 260 * Math.random())
  );

  return {
    id: faker.string.uuid(),
    name: `${year} ${compName}`,
    url: faker.internet.url(),
    description: faker.company.buzzPhrase(),
    photourl: faker.image.urlLoremFlickr(),
    entryOpenDate: futureDate,
    entryCloseDate: new Date(futureDate.getTime() + 1000 * 60 * 60 * 24 * 28),
    ceremonyDate: new Date(
      futureDate.getTime() + 1000 * 60 * 60 * 24 * (42 + 60 * Math.random())
    ),
    city,
    province,
    country,
  };
};

export const runClubSeeds = async () => {
  console.log("Seeding Club table...");

  const clubs = await Club.bulkCreate(
    [
      ...faker.helpers.multiple(createRandomClub, {
        count: 5,
      }),
    ],
    {
      ignoreDuplicates: true,
      individualHooks: true,
    }
  );

  await Promise.all(
    clubs.map((club) => {
      // Create Competitions
      const compName = `${faker.company.buzzAdjective()} ${faker.company.buzzNoun()}`;
      const allComps = Array(5)
        .fill(null)
        .map((_, idx) =>
          createRandomComp(
            compName,
            2023 - idx,
            club.city,
            club.province,
            club.country
          )
        );

      return Comp.bulkCreate(
        allComps.map((comp) => ({
          ...comp,
          ClubId: club.id,
        })),
        {
          ignoreDuplicates: true,
        }
      );
    })
  );

  return clubs;
};
