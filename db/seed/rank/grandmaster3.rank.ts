import { RankProgress } from '../../models/rank.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'
import categoryList from '../../util/categoryList.util'

const name = "Grand Master 3"
const description = "Produce 20 scoresheets each of a different subcategory with at least 43 score or higher. Of the 20 scoresheets, they shall include a minimum of 9 different BJCP categories. At least 5 of the scoresheets shall be a Lager, Mead or Cider"

const evalFn = (scoresheets: Array<Scoresheet & {Style: Style}>): RankProgress => {
  const _20_over_43_approved = {}
  const _20_over_43_unapproved = {}
  const _9_over_43_diff_cat_approved = {}
  const _9_over_43_diff_cat_unapproved = {}
  let _slmc_approved = 0
  let _slmc_unapproved = 0 

  scoresheets.forEach(scoresheet => {
    if (scoresheet.score >= 43) {
      const categoryString = scoresheet.Style.cat + scoresheet.Style.subcat
      const isSourLagerMeadCider = scoresheet.Style.isSour || scoresheet.Style.isLager || scoresheet.Style.isMead || scoresheet.Style.isCider

      if (scoresheet.approved) {
        _20_over_43_approved[categoryString] = true
        _9_over_43_diff_cat_approved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_approved += 1
        }
      } else {
        _20_over_43_unapproved[categoryString] = true
        _9_over_43_diff_cat_unapproved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_unapproved += 1
        }
      }
    }
  })

  return {
    achieved: Object.keys(_20_over_43_approved).length >= 20 && 
      Object.keys(_9_over_43_diff_cat_approved).length >= 9 &&
      _slmc_approved >= 5,
    sheetsApproved: Object.keys(_20_over_43_unapproved).length >= 20 && 
      Object.keys(_9_over_43_diff_cat_unapproved).length >= 9 &&
      _slmc_unapproved >= 5,
    requirements: [
      {
        description: "20 total 43+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_20_over_43_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_20_over_43_unapproved).length, 20),
        total: 20
      },
      {
        description: "9 categories 43+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_9_over_43_diff_cat_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_9_over_43_diff_cat_unapproved).length, 9),
        total: 9
      },
      {
        description: "5 categories 43+ sour/mead/lager/cider",
        categories: categoryList
          .filter(category => category.isSour || category.isLager || category.isMead || category.isCider)
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_20_over_43_unapproved).includes(categoryString)),
        completed: Math.min(_slmc_unapproved, 5),
        total: 5
      }
    ]
  }
}

export default {name, description, evalFn}