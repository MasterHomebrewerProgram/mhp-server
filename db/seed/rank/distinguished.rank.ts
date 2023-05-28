import { RankProgress } from '../../models/rank.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'
import categoryList from '../../util/categoryList.util'

const name = "Distinguished"
const description = "Produce 15 scoresheets each of a different subcategory with at least 38 score or higher. Of the 15 scoresheets, they shall include a minimum of 11 different BJCP categories. At least 2 of the scoresheets shall be a Sour, Lager, Mead or Cider"

const evalFn = (scoresheets: Array<Scoresheet & {Style: Style}>): RankProgress => {
  const _15_over_38_approved = {}
  const _15_over_38_unapproved = {}
  const _10_over_38_diff_cat_approved = {}
  const _10_over_38_diff_cat_unapproved = {}
  let _slmc_approved = 0
  let _slmc_unapproved = 0 

  scoresheets.forEach(scoresheet => {
    if (scoresheet.score >= 38) {
      const categoryString = scoresheet.Style.cat + scoresheet.Style.subcat
      const isSourLagerMeadCider = scoresheet.Style.isSour || scoresheet.Style.isLager || scoresheet.Style.isMead || scoresheet.Style.isCider

      if (scoresheet.approved) {
        _15_over_38_approved[categoryString] = true
        _10_over_38_diff_cat_approved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_approved += 1
        }
      } else {
        _15_over_38_unapproved[categoryString] = true
        _10_over_38_diff_cat_unapproved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_unapproved += 1
        }
      }
    }
  })

  return {
    achieved: Object.keys(_15_over_38_approved).length >= 15 && 
      Object.keys(_10_over_38_diff_cat_approved).length >= 11 &&
      _slmc_approved >= 2,
    sheetsApproved: Object.keys(_15_over_38_unapproved).length >= 15 && 
      Object.keys(_10_over_38_diff_cat_unapproved).length >= 11 &&
      _slmc_unapproved >= 2,
    requirements: [
      {
        description: "15 total 38+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_15_over_38_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_15_over_38_unapproved).length, 15),
        total: 15
      },
      {
        description: "11 categories 38+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_10_over_38_diff_cat_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_10_over_38_diff_cat_unapproved).length, 11),
        total: 11
      },
      {
        description: "2 categories 38+ sour/mead/lager/cider",
        categories: categoryList
          .filter(category => category.isSour || category.isLager || category.isMead || category.isCider)
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_15_over_38_unapproved).includes(categoryString)),
        completed: Math.min(_slmc_unapproved, 2),
        total: 2
      }
    ]
  }
}

export default {name, description, evalFn}