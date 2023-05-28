import { AwardProgress } from '../../models/award.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'

const name = "Jack of all Trades"
const description = "1 scoresheet from each of the 40 categories of beer/mead/cider"

const evalFn = (scoresheets: Array<Scoresheet & {Style: Style}>): AwardProgress => {
  const categories = Array.from({length: 43}, (_, i) => String(i + 1))
  const requirements = {}
  let sheetsApproved = true

  categories.forEach(category => {
    const matches = scoresheets.filter(scoresheet => scoresheet.Style.cat === category)

    if ( !matches.length ) {
      requirements[category] = 1
      sheetsApproved = false
    } else if ( !matches.find(match => match.approved) ) {
      sheetsApproved = false
    }
  })

  return {
    achieved: Object.keys(requirements).length === 0,
    sheetsApproved,
    requirements: [
      {
        description: "Required categories",
        categories: Object.keys(requirements),
        completed: 43 - Object.keys(requirements).length,
        total: 43
      }
    ]
  }
}

export default {name, description, evalFn}