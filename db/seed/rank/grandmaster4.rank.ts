import { RankProgress } from '../../models/rank.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'
import categoryList from '../../util/categoryList.util'

const name = "Grand Master 4"
const description = "Produce 25 scoresheets each of a different subcategory with at least 43 score or higher. Of the 25 scoresheets, they shall include a minimum of 11 different BJCP categories. At least 6 of the scoresheets shall be a Sour, Lager, Mead or Cider"

const evalFn = (scoresheets: Array<Scoresheet & {Style: Style}>): RankProgress => {
  const _25_over_43_approved = {}
  const _25_over_43_unapproved = {}
  const _11_over_43_diff_cat_approved = {}
  const _11_over_43_diff_cat_unapproved = {}
  let _slmc_approved = 0
  let _slmc_unapproved = 0 

  scoresheets.forEach(scoresheet => {
    if (scoresheet.score >= 43) {
      const categoryString = scoresheet.Style.cat + scoresheet.Style.subcat
      const isSourLagerMeadCider = scoresheet.Style.isSour || scoresheet.Style.isLager || scoresheet.Style.isMead || scoresheet.Style.isCider

      if (scoresheet.approved) {
        _25_over_43_approved[categoryString] = true
        _11_over_43_diff_cat_approved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_approved += 1
        }
      } else {
        _25_over_43_unapproved[categoryString] = true
        _11_over_43_diff_cat_unapproved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_unapproved += 1
        }
      }
    }
  })

  return {
    achieved: Object.keys(_25_over_43_approved).length >= 25 && 
      Object.keys(_11_over_43_diff_cat_approved).length >= 11 &&
      _slmc_approved >= 6,
    sheetsApproved: Object.keys(_25_over_43_unapproved).length >= 25 && 
      Object.keys(_11_over_43_diff_cat_unapproved).length >= 11 &&
      _slmc_unapproved >= 6,
    requirements: [
      {
        description: "25 total 43+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_25_over_43_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_25_over_43_unapproved).length, 25),
        total: 25
      },
      {
        description: "11 categories 43+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_11_over_43_diff_cat_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_11_over_43_diff_cat_unapproved).length, 11),
        total: 11
      },
      {
        description: "6 categories 43+ sour/mead/lager/cider",
        categories: categoryList
          .filter(category => category.isSour || category.isLager || category.isMead || category.isCider)
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_25_over_43_unapproved).includes(categoryString)),
        completed: Math.min(_slmc_unapproved, 6),
        total: 6
      }
    ]
  }
}

export default {name, description, evalFn}