import Rating, {RatingAttributes, RatingData, RatingInput} from '../models/rating.model'
import User, { UserAttributes } from '../models/user.model'
import Comp, { CompAttributes } from '../models/comp.model'

export const getRatingById = async (ratingId: string): Promise<RatingAttributes> => {
  const rating = await Rating.findOne({
    where: {id: ratingId}
  })

  if (!rating) {
    return Promise.reject({message: "Could not find rating"})
  }

  return rating.get({plain: true})
}

export const getRatingsByComp = async (compId: string): Promise<CompAttributes & {Ratings?: RatingAttributes[]}> => {
  const comp = await Comp.findOne({
    where: {id: compId},
    include: Rating,
    raw: true,
    nest: true
  })

  if (!comp) {
    return Promise.reject({message: "Could not find comp"})
  }

  return comp
}

export const createRating = async (userId: string, compId: string, ratingInput: RatingInput): Promise<RatingAttributes> => {
  const user = await User.count({
    where: {id: userId}
  })

  if (!user) {
    return Promise.reject({message: "Could not find user"})
  }

  const comp = await Comp.count({
    where: {id: compId}
  })

  if (!comp) {
    return Promise.reject({message: "Could not find comp"})
  }

  ratingInput.id = undefined

  const rating = await Rating.create({
    //@ts-expect-error UserId not exposed
    "UserId": userId,
    "CompId": compId,
    ...ratingInput
  })

  return rating.get({plain: true})
}

export const updateRating = async (ratingId: string, ratingInput: RatingInput): Promise<RatingAttributes> => {
  const rating = await Rating.findOne({
    where: {id: ratingId}
  })

  if (!rating) {
    return Promise.reject({message: "Could not find rating"})
  }

  ratingInput.id = undefined

  await rating.update({
    ...ratingInput
  })

  return rating.get({plain: true})
}

export const deleteRating = async (ratingId: string): Promise<boolean> => {
  const numDeleted = await Rating.destroy({
    where: {id: ratingId}
  })

  return numDeleted > 0
}