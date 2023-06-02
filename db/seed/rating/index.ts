import { faker } from '@faker-js/faker';

import Rating, { RatingData } from '../../models/rating.model';
import User from '../../models/user.model';
import Comp from '../../models/comp.model';
import sequelizeConnection from '../../config';

const generateMockRating = (score: number): RatingData => {
  let currentPoints = score
  const output = {}

  const maxScore: RatingData = {
    awards: {
      type: 6,
      quality: 12
    },
    scoresheets: {
      rankedJudges: 6,
      quality: 7,
      legibility: 2
    },
    prizes: {
      quality: 9,
      bosAward: 5
    },
    timeliness: {
      onSchedule: 6,
      resultsPublished: 5
    },
    competitiveness: {
      difficulty: 9
    },
    registration: {
      ease: 9
    },
    comprehensiveness: {
      numTables: 5,
      ciderMead: 3
    },
    awardCeremony: {
      livestream: 3,
      conference: 3
    },
    delivery: {
      shipment: 2,
      dropoff: 4
    },
    communication: {
      quality: 4
    }
  }

  Object.entries(maxScore).forEach(([primaryCat, secondaryCat]: [string, {[secondaryCat: string]: number}]) => {
    output[primaryCat] = {}

    Object.entries(secondaryCat).forEach(([secondaryCat, maxCatScore]) => {
      if (maxCatScore < currentPoints) {
        const numPoints = Math.round(Math.random()*maxCatScore)
        currentPoints -= numPoints
        output[primaryCat][secondaryCat] = numPoints
      } else {
        const numPoints = currentPoints
        currentPoints = 0
        output[primaryCat][secondaryCat] = numPoints
      }
    })
  })

  return output as RatingData
}

export const runRatingSeeds = async (users: User[]) => {
  Promise.all(
    users.map(async user => {
      const compsToRate = await Comp.findAll({
        order: sequelizeConnection.random(),
        limit: ~~(Math.random()*10)
      })

      return await Promise.all(
        compsToRate.map(async comp => {
          const score = Math.round(100*Math.random())
          const data = generateMockRating(score)

          return await Rating.create({
            score,
            text: faker.lorem.sentence(),
            data,
            isPublic: true,
            isAnonymous: Boolean(Math.round(Math.random())),

            //@ts-expect-error UserId not exposed
            "UserId": user.id,
            "CompId": comp.id
          })
        })
      )
    })
  )
}