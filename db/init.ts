import sequelizeConnection from './config'
import {runAwardSeeds} from "./seed/award"
const isDev = process.env.NODE_ENV === 'development'

import User from './models/user.model';
import Club from './models/club.model';
import Scoresheet from "./models/scoresheet.model";
import Style from "./models/style.model"
import Rank, { Rank_User } from "./models/rank.model";
import Award, { Award_User } from "./models/award.model";
import Comp from "./models/comp.model";
import Circuit, {Comp_Circuit} from "./models/circuit.model";

const dbInit = async () => {
  console.log("Initializing DB...")

  // Set up database relations
  Club.hasMany(User)
  User.belongsToMany(Rank, {through: Rank_User})
  User.belongsToMany(Award, {through: Award_User})
  User.hasMany(Scoresheet)
  Scoresheet.belongsTo(User)
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
  Comp.belongsTo(Club)
  Scoresheet.belongsTo(Comp)
  Circuit.belongsToMany(Comp, {through: Comp_Circuit})
  Style.hasMany(Scoresheet)

  await sequelizeConnection.sync({
    force: isDev
  })

  await runAwardSeeds()
}
export default dbInit 