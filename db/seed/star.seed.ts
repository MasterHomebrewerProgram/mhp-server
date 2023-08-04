import Star from "../models/star.model";

const basePath = "./images/stars";

export const runStarSeeds = async () => {
  console.log("Seeding Star table...");

  const stars = ["gold", "silver", "bronze"];

  return await Promise.allSettled(
    stars.map(async (name) => {
      const starExists = await Star.findOne({
        where: { name },
      });

      if (starExists) return Promise.reject("award exists");

      return Star.create({
        name,
        description: name,
        photourl: `${basePath}/${name}.png`,
      });
    })
  );
};
