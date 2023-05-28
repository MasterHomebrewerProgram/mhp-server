import { RankProgress } from '../../models/rank.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'
import categoryList from '../../util/categoryList.util'

const name = "Novice"
const description = "Produce 10 or more beers of different subcategories with 43+ scoresheets of German/Austrian/Polish/Czechia origin"

const evalFn = (scoresheets: Array<Scoresheet & {Style: Style}>): RankProgress => {
  const _5_over_21_approved = {}
  const _5_over_21_unapproved = {}
  const _4_over_21_diff_cat_approved = {}
  const _4_over_21_diff_cat_unapproved = {}

  scoresheets.forEach(scoresheet => {
    if (scoresheet.score >= 21) {
      const categoryString = scoresheet.Style.cat + scoresheet.Style.subcat

      if (scoresheet.approved) {
        _5_over_21_approved[categoryString] = true
        _4_over_21_diff_cat_approved[scoresheet.Style.cat] = true
      } else {
        _5_over_21_unapproved[categoryString] = true
        _4_over_21_diff_cat_unapproved[scoresheet.Style.cat] = true
      }
    }
  })

  return {
    achieved: Object.keys(_5_over_21_approved).length >= 5 && Object.keys(_4_over_21_diff_cat_approved).length >= 4,
    sheetsApproved: Object.keys(_5_over_21_unapproved).length >= 5 && Object.keys(_4_over_21_diff_cat_unapproved).length >= 4,
    requirements: [
      {
        description: "5 total 21+",
        categories: categoryList.map(category => category.cat+category.subcat).filter(categoryString => !Object.keys(_5_over_21_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_5_over_21_unapproved).length, 5),
        total: 5
      },
      {
        description: "4 categories 21+",
        categories: categoryList.map(category => category.cat+category.subcat).filter(categoryString => !Object.keys(_4_over_21_diff_cat_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_4_over_21_diff_cat_unapproved).length, 4),
        total: 4
      }
    ]
  }
}

export default {name, description, evalFn}