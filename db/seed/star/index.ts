import Star from '../../models/star.model'

export const runStarSeeds = async () => {
  console.log("Seeding stars...")

  const stars = ['gold', 'silver', 'bronze']
  
  return await Promise.allSettled(
    stars.map(async name => {
      const starExists = await Star.findOne({
        where: { name}
      })

      if (starExists) return Promise.reject("award exists")

      return Star.create({
        name,
        description: name,
        photourl: ""
      })
    })
  )
}