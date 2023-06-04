import { Op } from 'sequelize'
import Club, {ClubAttributes, ClubInput} from '../models/club.model'
import User, { UserAttributes } from '../models/user.model'
import { Club_User } from '../models'

export const getClub = async (clubId: string): Promise<ClubAttributes> => {
  const club = await Club.findOne({
    where: {id: clubId}
  })

  if (!club) {
    return Promise.reject({message: "Could not find club"})
  }

  return club.get({plain: true})
}

export const createClub = async (clubData: ClubInput): Promise<ClubAttributes> => {
  const clubName = clubData.name?.toLocaleLowerCase()
  const clubSlug = clubData.slug

  if (!clubName) {
    return Promise.reject({message: "Club name required"})
  }

  if (!clubSlug) {
    return Promise.reject({message: "Club slug required"})
  }

  const existingClub = await Club.findOne({ 
    where: { 
      [Op.or]: [
        {name: clubName},
        {slug: clubSlug}
      ]
    }
  })

  if (existingClub) {
    return Promise.reject({message: "Club name already exists!"})
  }

  const newClub = await Club.create({
    ...clubData,
    name: clubName
  })

  return newClub.get({plain: true})
}

export const updateClub = async (clubData: Partial<ClubInput>): Promise<ClubAttributes> => {
  const clubName = clubData.name?.toLocaleLowerCase()

  const existingClub = await Club.findOne({ 
    where: { 
      [Op.or]: [
        {id: clubData.id},
        {name: clubName},
        {slug: clubData.slug}
      ]
    }
  })

  if (!existingClub) {
    return Promise.reject({
      message: "Club not found"
    });
  }

  const club = await existingClub.update(clubData)

  return club.get({plain: true})
}

export const deleteClub = async (clubId: string): Promise<boolean> => {
  const deleted = await Club.destroy({
    where: {id: clubId}
  })

  return deleted > 0
}

export const addUserToClub = async (userId: string, clubId: string): Promise<UserAttributes> => {
  const user = await User.count({
    where: {id: userId}
  })

  if (!user) {
    return Promise.reject({message: "Could not find user"})
  }

  const club = await Club.count({
    where: {id: clubId}
  })

  if (!club) {
    return Promise.reject({message: "Could not find club"})
  }

  await Club_User.create({
    // @ts-expect-error ClubId not exposed
    "ClubId": clubId,
    "UserId": userId
  })

  const updatedUser = await User.findOne({
    where: {id: userId},
    include: {
      model: Club
    }
  })

  return updatedUser.get({plain: true})
}

export const removeUserFromClub = async (userId: string, clubId: string): Promise<boolean> => {
  const numRemoved = await Club_User.destroy({
    where: {
      // @ts-expect-error ClubId not exposed
      "ClubId": clubId,
      "UserId": userId
    }
  })

  return numRemoved > 0
}