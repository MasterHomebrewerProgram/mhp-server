import { RankProgress } from '../../models/rank.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'
import categoryList from '../../util/categoryList.util'

const name = "Proficient"
const description = "Produce 10 scoresheets each of a different subcategory with at least 30 score or higher. Of the 10 scoresheets, they shall include a minimum of 7 different BJCP categories. At least 2 of the scoresheets shall be a Sour, Lager, Mead or Cider"

const evalFn = (scoresheets: Array<Scoresheet & {Style: Style}>): RankProgress => {
  const _10_over_30_approved = {}
  const _10_over_30_unapproved = {}
  const _7_over_30_diff_cat_approved = {}
  const _7_over_30_diff_cat_unapproved = {}
  let _slmc_approved = 0
  let _slmc_unapproved = 0 

  scoresheets.forEach(scoresheet => {
    if (scoresheet.score >= 30) {
      const categoryString = scoresheet.Style.cat + scoresheet.Style.subcat
      const isSourLagerMeadCider = scoresheet.Style.isSour || scoresheet.Style.isLager || scoresheet.Style.isMead || scoresheet.Style.isCider

      if (scoresheet.approved) {
        _10_over_30_approved[categoryString] = true
        _7_over_30_diff_cat_approved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_approved += 1
        }
      } else {
        _10_over_30_unapproved[categoryString] = true
        _7_over_30_diff_cat_unapproved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_unapproved += 1
        }
      }
    }
  })

  return {
    achieved: Object.keys(_10_over_30_approved).length >= 10 && 
      Object.keys(_7_over_30_diff_cat_approved).length >= 7 &&
      _slmc_approved >= 2,
    sheetsApproved: Object.keys(_10_over_30_unapproved).length >= 10 && 
      Object.keys(_7_over_30_diff_cat_unapproved).length >= 7 &&
      _slmc_unapproved >= 2,
    requirements: [
      {
        description: "10 total 30+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_10_over_30_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_10_over_30_unapproved).length, 10),
        total: 10
      },
      {
        description: "7 categories 30+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_7_over_30_diff_cat_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_7_over_30_diff_cat_unapproved).length, 7),
        total: 7
      },
      {
        description: "2 categories 21+ sour/mead/lager/cider",
        categories: categoryList
          .filter(category => category.isSour || category.isLager || category.isMead || category.isCider)
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_10_over_30_unapproved).includes(categoryString)),
        completed: Math.min(_slmc_unapproved, 2),
        total: 2
      }
    ]
  }
}

export default {name, description, evalFn}