import { RankProgress } from '../../models/rank.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'
import categoryList from '../../util/categoryList.util'

const name = "Grand Master 5"
const description = "Produce 30 scoresheets each of a different subcategory with at least 43 score or higher. Of the 30 scoresheets, they shall include a minimum of 13 different BJCP categories. At least 7 of the scoresheets shall be a Sour, Lager, Mead or Cider"

const evalFn = (scoresheets: Array<Scoresheet & {Style: Style}>): RankProgress => {
  const _30_over_43_approved = {}
  const _30_over_43_unapproved = {}
  const _13_over_43_diff_cat_approved = {}
  const _13_over_43_diff_cat_unapproved = {}
  let _slmc_approved = 0
  let _slmc_unapproved = 0 

  scoresheets.forEach(scoresheet => {
    if (scoresheet.score >= 43) {
      const categoryString = scoresheet.Style.cat + scoresheet.Style.subcat
      const isSourLagerMeadCider = scoresheet.Style.isSour || scoresheet.Style.isLager || scoresheet.Style.isMead || scoresheet.Style.isCider

      if (scoresheet.approved) {
        _30_over_43_approved[categoryString] = true
        _13_over_43_diff_cat_approved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_approved += 1
        }
      } else {
        _30_over_43_unapproved[categoryString] = true
        _13_over_43_diff_cat_unapproved[scoresheet.Style.cat] = true

        if (isSourLagerMeadCider) {
          _slmc_unapproved += 1
        }
      }
    }
  })

  return {
    achieved: Object.keys(_30_over_43_approved).length >= 30 && 
      Object.keys(_13_over_43_diff_cat_approved).length >= 13 &&
      _slmc_approved >= 7,
    sheetsApproved: Object.keys(_30_over_43_unapproved).length >= 30 && 
      Object.keys(_13_over_43_diff_cat_unapproved).length >= 13 &&
      _slmc_unapproved >= 7,
    requirements: [
      {
        description: "30 total 43+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_30_over_43_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_30_over_43_unapproved).length, 30),
        total: 30
      },
      {
        description: "13 categories 43+",
        categories: categoryList
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_13_over_43_diff_cat_unapproved).includes(categoryString)),
        completed: Math.min(Object.keys(_13_over_43_diff_cat_unapproved).length, 13),
        total: 13
      },
      {
        description: "7 categories 43+ sour/mead/lager/cider",
        categories: categoryList
          .filter(category => category.isSour || category.isLager || category.isMead || category.isCider)
          .map(category => category.cat+category.subcat)
          .filter(categoryString => !Object.keys(_30_over_43_unapproved).includes(categoryString)),
        completed: Math.min(_slmc_unapproved, 7),
        total: 7
      }
    ]
  }
}

export default {name, description, evalFn}