import Award, { AwardProgress } from '../models/award.model'
import Scoresheet from '../models/scoresheet.model'
import Style from '../models/style.model'

const seedJackOfAllTrades = async () => {
  const awardName = "Jack of All Trades"
  const awardExists = await Award.findOne({
    where: { name: awardName }
  })

  if (awardExists) return
  console.log(`Seeding ${awardName} award config`)

  const evalJackOfAllTrades = (scoresheets: Array<Scoresheet & {Style: Style}>): AwardProgress => {
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
      requirements
    }
  }

  await Award.create({
    name: awardName,
    description: "1 scoresheet from each of the 40 categories of beer/mead/cider",
    photourl: "",
    evalFnText: evalJackOfAllTrades.toString()
  })
}

export const runAwardSeeds = () => {
  seedJackOfAllTrades()
}