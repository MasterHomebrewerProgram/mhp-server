import { AwardProgress } from '../../models/award.model'
import Scoresheet from '../../models/scoresheet.model'
import Style from '../../models/style.model'

const name = "Braumeister"
const description = "Produce 10 or more beers of different subcategories with 43+ scoresheets of German/Austrian/Polish/Czechia origin"

const evalFn = (scoresheets: Array<Scoresheet & {Style: Style}>): AwardProgress => {
  const categories = {
    "3A" : true, 
    "3B" : true, 
    "3C" : true,
    "4A" : true, 
    "4B" : true, 
    "4C" : true,
    "5A" : true, 
    "5B" : true, 
    "5C" : true,
    "6A" : true, 
    "6B" : true, 
    "6C" : true,
    "7A" : true, 
    "7B" : true, 
    "7C" : true,
    "8A" : true, 
    "8B" : true, 
    "8C" : true,
    "9A" : true, 
    "9B" : true,
    "10A" : true, 
    "10B" : true, 
    "10C" : true,
    "23A" : true, 
    "23G" : true,
    "27H" : true, 
    "27C" : true, 
    "27E" : true, 
    "27A": true 
  }

  // Filter by allowed categories and score >= 43
  const filteredByCategory = scoresheets.filter(
    (scoresheet:Scoresheet & {Style: Style}) => scoresheet.score >= 43 && categories[scoresheet.Style.cat + scoresheet.Style.subcat]
  )

  // First pass - try to find approved only
  const firstPass = [...filteredByCategory].filter(scoresheet => scoresheet.approved)
  const indexedSheets = {}
  firstPass.forEach(sheet => {
    if (!indexedSheets[sheet.Style.cat + sheet.Style.subcat]) {
      indexedSheets[sheet.Style.cat + sheet.Style.subcat] = 1
    }

    indexedSheets[sheet.Style.cat + sheet.Style.subcat] += 1
  })

  if (Object.keys(indexedSheets).length >= 10 ) {
    return {
      achieved: true,
      sheetsApproved: true
    }
  }

  // Second pass - allow unapproved
  filteredByCategory.forEach(sheet => {
    if (!indexedSheets[sheet.Style.cat + sheet.Style.subcat]) {
      indexedSheets[sheet.Style.cat + sheet.Style.subcat] = 1
    }

    indexedSheets[sheet.Style.cat + sheet.Style.subcat] += 1
  })

  if (Object.keys(indexedSheets).length >= 10) {
    return {
      achieved: true,
      sheetsApproved: false,
    }
  }

  // Third pass - award not valid
  return {
    achieved: false,
    sheetsApproved: false,
    requirements: [{
      description: "43+",
      categories: Object.keys(categories).filter(category => !Object.keys(indexedSheets).includes(category)),
      completed: Object.keys(indexedSheets).length,
      total: 10
    }]
  }
}

export default {name, description, evalFn}