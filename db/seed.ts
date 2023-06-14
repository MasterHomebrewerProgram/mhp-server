import {
  runAwardSeeds,
  runCircuitSeeds,
  runClubSeeds,
  runRankSeeds,
  runRatingSeeds,
  runStarSeeds,
  runStyleSeeds,
  runUserSeeds,
} from "./seed/index";

const isDev = process.env.NODE_ENV === "development";

const runSeeds = async (useMockData = false) => {
  console.log("\nRunning seeds...\n");

  await runAwardSeeds();
  await runRankSeeds();
  await runStarSeeds();
  await runStyleSeeds();

  if (useMockData) {
    const clubs = await runClubSeeds();
    await runCircuitSeeds();
    const users = await runUserSeeds(clubs);
    await runRatingSeeds(users);
  }

  console.log("\nDone seeding!\n");
};

runSeeds(isDev);
