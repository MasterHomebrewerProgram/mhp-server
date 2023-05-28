import { RankProgress } from '../../models/rank.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'
import categoryList from '../../util/categoryList.util'

const name = "Grand Master 2"
const description = "Produce 15 scoresheets each of a different subcategory with at least 43 score or higher. Of the 15 scoresheets, they shall include a minimum of 7 different BJCP categories. At least 4 of the scoresheets shall be a Lager, Mead or Cider"

const evalFn = (scoresheets: Array<Scoresheet & {Style: Style}>): RankProgress => {
  const _15_over_43_approved = {}
  const _15_over_43_unapproved = {}
  const _7_over_43_diff_cat_approved = {}
  const _7_over_43_diff_cat_unapproved = {}
  let _slmc_approved = 0
  let _slmc_unapproved = 0 

  scoresheets.forEach(scoresheet => {
    if (scoresheet.score >= 43) {
      const categoryString = scoresheet.Style.cat + scoresheet.Style.subcat
      const isSourLagerMeadCider = scoresheet.Style.isSour || scoresheet.Style.isLager || scoresheet.Style.isMead || scoresheet.Style.isCider

      if (scoresheet.approved) {
        _15_over_43_approved[categoryString] = true
        _7_over_43_diff_cat_approved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_approved += 1
        }
      } else {
        _15_over_43_unapproved[categoryString] = true
        _7_over_43_diff_cat_unapproved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_unapproved += 1
        }
      }
    }
  })

  return {
    achieved: Object.keys(_15_over_43_approved).length >= 15 && 
      Object.keys(_7_over_43_diff_cat_approved).length >= 7 &&
      _slmc_approved >= 4,
    sheetsApproved: Object.keys(_15_over_43_unapproved).length >= 15 && 
      Object.keys(_7_over_43_diff_cat_unapproved).length >= 7 &&
      _slmc_unapproved >= 4,
    requirements: [
      {
        description: "15 total 43+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_15_over_43_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_15_over_43_unapproved).length, 15),
        total: 15
      },
      {
        description: "7 categories 43+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_7_over_43_diff_cat_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_7_over_43_diff_cat_unapproved).length, 7),
        total: 7
      },
      {
        description: "4 categories 43+ sour/mead/lager/cider",
        categories: categoryList
          .filter(category => category.isSour || category.isLager || category.isMead || category.isCider)
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_15_over_43_unapproved).includes(categoryString)),
        completed: Math.min(_slmc_unapproved, 4),
        total: 4
      }
    ]
  }
}

export default {name, description, evalFn}