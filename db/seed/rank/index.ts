import Rank, { RankProgress } from '../../models/rank.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'

import Novice from './novice.rank'
import Apprentice from './apprentice.rank'
import Proficient from './proficient.rank'
import Recognized from './recognized.rank'
import Distinguished from './distinguished.rank'
import Master from './master.rank'
import Grandmaster1 from './grandmaster1.rank'
import Grandmaster2 from './grandmaster2.rank'
import Grandmaster3 from './grandmaster3.rank'
import Grandmaster4 from './grandmaster4.rank'
import Grandmaster5 from './grandmaster5.rank'

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
  seedRank(Apprentice)
  seedRank(Proficient)
  seedRank(Recognized)
  seedRank(Distinguished)
  seedRank(Master)
  seedRank(Grandmaster1)
  seedRank(Grandmaster2)
  seedRank(Grandmaster3)
  seedRank(Grandmaster4)
  seedRank(Grandmaster5)
}