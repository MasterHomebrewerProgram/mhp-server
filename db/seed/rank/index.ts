import Rank, { RankProgress } from '../../models/rank.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'

import Novice from './novice.rank'

interface seedFile {
  name: string,
  description: string,
  evalFn: (scoresheets: Array<Scoresheet & {Style: Style}>) => RankProgress
}

const seedRank = async (input: seedFile, force=false) => {
  const awardExists = await Rank.findOne({
    where: { name: input.name}
  })

  // Don't overwrite existing awards unless force enabled
  if (!force && awardExists) return

  console.log(`Seeding ${input.name} rank config`)

  // Create entry
  await Rank.create({
    name: input.name,
    description: input.description,
    photourl: "",
    evalFnText: input.evalFn.toString()
  })
}

export const runRankSeeds = () => {
  seedRank(Novice)
}