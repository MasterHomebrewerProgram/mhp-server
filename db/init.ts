import sequelizeConnection from './config'
import {runAwardSeeds, runRankSeeds, runStarSeeds, runStyleSeeds} from "./seed"
const isDev = process.env.NODE_ENV === 'development'

import User from './models/user.model';
import Club, { Club_User } from './models/club.model';
import Scoresheet from "./models/scoresheet.model";
import Style from "./models/style.model"
import Rank, { Rank_User } from "./models/rank.model";
import Award, { Award_User } from "./models/award.model";
import Star, { Star_User } from "./models/star.model";
import Comp from "./models/comp.model";
import Circuit, {Comp_Circuit} from "./models/circuit.model";
import Rating from "./models/rating.model"

const dbInit = async () => {
  console.log("Initializing DB...")

  // Set up database relations
  User.belongsToMany(Club, {through: Club_User})
  User.belongsToMany(Rank, {through: Rank_User})
  User.belongsToMany(Award, {through: Award_User})
  User.hasMany(Scoresheet)
  Scoresheet.belongsTo(User)
  User.hasMany(Rating)
  Rank.belongsToMany(User, {through: Rank_User})
  Rank_User.belongsTo(User, {
    foreignKey: {
      name: "approvedby"
    }
  })
  Award.belongsToMany(User, {through: Award_User})
  Award_User.belongsTo(User, {
    foreignKey: {
      name: "approvedby"
    }
  })
  Star.belongsToMany(User, {through: Star_User})
  Award_User.belongsTo(User, {
    foreignKey: {
      name: "approvedby"
    }
  })
  Comp.belongsTo(Club)
  Scoresheet.belongsTo(Comp)
  Circuit.belongsToMany(Comp, {through: Comp_Circuit})
  Style.hasMany(Scoresheet)
  Comp.hasMany(Rating)

  console.log("\nSetting up schema...\n")

  await sequelizeConnection.sync({
    force: isDev
  })

  console.log("\nRunning seeds...\n")

  await runAwardSeeds()
  await runRankSeeds()
  await runStarSeeds()
  await runStyleSeeds()

  console.log("\nDone seeding!\n")
}
export default dbInit 