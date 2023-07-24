import sequelizeConnection from "./config";
const isDev = process.env.NODE_ENV === "development";
const args = process.argv.slice(2);

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

import User from "./models/user.model";
import Club, { Club_User } from "./models/club.model";
import Scoresheet from "./models/scoresheet.model";
import Style from "./models/style.model";
import Rank, { Rank_User } from "./models/rank.model";
import Award, { Award_User } from "./models/award.model";
import Star, { Star_User } from "./models/star.model";
import Comp from "./models/comp.model";
import Circuit, { Comp_Circuit } from "./models/circuit.model";
import Rating from "./models/rating.model";

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

export const dbInit = async (isDev = false) => {
  console.log("Initializing DB...");

  // Set up database relations
  User.belongsToMany(Club, { through: Club_User });
  User.belongsToMany(Rank, { through: Rank_User });
  User.belongsToMany(Award, { through: Award_User });
  User.belongsToMany(Star, { through: Star_User });
  User.hasMany(Scoresheet, { onDelete: "cascade" });
  Scoresheet.belongsTo(User);
  Rank_User.belongsTo(User, {
    foreignKey: {
      name: "approvedby",
    },
  });
  User.hasMany(Rating);
  Rating.belongsTo(User);
  Rank.belongsToMany(User, { through: Rank_User });
  Rank_User.belongsTo(User, {
    foreignKey: {
      name: "approvedby",
    },
  });
  Award.belongsToMany(User, { through: Award_User });
  Award_User.belongsTo(User, {
    foreignKey: {
      name: "approvedby",
    },
  });
  Star.belongsToMany(User, { through: Star_User });
  Award_User.belongsTo(User, {
    foreignKey: {
      name: "approvedby",
    },
  });
  Comp.belongsTo(Club);
  Scoresheet.belongsTo(Comp);
  Circuit.belongsToMany(Comp, { through: Comp_Circuit });
  Comp.belongsToMany(Circuit, { through: Comp_Circuit });
  Scoresheet.belongsTo(Style);
  Style.hasMany(Scoresheet);
  Comp.hasMany(Rating);
  Rating.belongsTo(Comp);

  console.log("\nSetting up schema...\n");

  await sequelizeConnection.sync({
    force: isDev,
  });

  if (args.includes("--seed")) {
    await runSeeds(isDev);
  }
};

dbInit(isDev);
