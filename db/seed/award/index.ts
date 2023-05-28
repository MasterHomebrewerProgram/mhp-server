import Award, { AwardProgress } from '../../models/award.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'

import JackOfAllTrades from './jack_of_all_trades.award'
import Braumeister from './braumeister.award'

interface seedFile {
  name: string,
  description: string,
  evalFn: (scoresheets: Array<Scoresheet & {Style: Style}>) => AwardProgress
}

const seedAward = async (input: seedFile, force=false) => {
  const awardExists = await Award.findOne({
    where: { name: input.name}
  })

  // Don't overwrite existing awards unless force enabled
  if (!force && awardExists) return

  console.log(`Seeding ${input.name} award config`)

  // Create entry
  await Award.create({
    name: input.name,
    description: input.description,
    photourl: "",
    evalFnText: input.evalFn.toString()
  })
}

export const runAwardSeeds = () => {
  seedAward(JackOfAllTrades)
  seedAward(Braumeister)
}