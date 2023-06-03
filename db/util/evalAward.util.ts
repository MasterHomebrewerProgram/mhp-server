import Award, { AwardProgress } from '../models/award.model'
import Scoresheet from '../models/scoresheet.model'
import Style from '../models/style.model'
import categoryList from './categoryList.util'

export default (scoresheets: Array<Scoresheet & {Style: Style}>, award: Award): AwardProgress => {
  const categoriesApproved = {}
  const categoriesUnapproved = {}

  scoresheets.forEach(scoresheet => {
    const categoryString = scoresheet.Style.cat + scoresheet.Style.subcat

    if (scoresheet.score >= award.minScore && award.categoryList.includes(categoryString)) {
      if (scoresheet.approved) {
        categoriesApproved[scoresheet.Style.cat + scoresheet.Style.subcat] = true
      }

      categoriesUnapproved[scoresheet.Style.cat + scoresheet.Style.subcat] = true
    }
  })

  const sheetsApproved = Object.keys(categoriesApproved).length >= award.minRequired 

  const achieved = Object.keys(categoriesUnapproved).length >= award.minRequired

  const requirements = !achieved ? [
    {
      description: `${award.minRequired} styles ${award.minScore}+ in list`,
      categories: award.categoryList
        .filter(categoryString => !Object.keys(categoriesUnapproved).includes(categoryString)),
      completed: Math.min(Object.keys(categoriesUnapproved).length, award.minRequired),
      total: Number(award.minRequired)
    }
  ] : []

  return {
    sheetsApproved,
    achieved,
    requirements
  }
}