import Style from '../../models/style.model'
import categoryList from '../../util/categoryList.util'

export const runStyleSeeds = async () => {
  console.log("Seeding Style table...")

  return await Style.bulkCreate(categoryList, {
    ignoreDuplicates: true
  })
}