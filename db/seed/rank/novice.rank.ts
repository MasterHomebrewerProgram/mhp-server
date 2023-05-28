import { AwardProgress } from '../../models/award.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'

const name = "Novice"
const description = "Produce 10 or more beers of different subcategories with 43+ scoresheets of German/Austrian/Polish/Czechia origin"

const evalFn = (scoresheets: Array<Scoresheet & {Style: Style}>): AwardProgress => {
  return {
    achieved: false,
    sheetsApproved: false,
    requirements: {},
    totalRequirements: 10
  }
}

export default {name, description, evalFn}