import { Op } from 'sequelize'
import Club, {ClubInput} from '../models/club.model'
import User from '../models/user.model'

export const getClub = async (clubId: string): Promise<Club> => {
  const club = await Club.findOne({
    where: {id: clubId}
  })

  if (!club) {
    return Promise.reject({message: "Could not find club"})
  }

  return club
}

export const createClub = async (clubData: ClubInput): Promise<Club> => {
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

  return newClub
}

export const updateClub = async (clubData: Partial<ClubInput>): Promise<Club> => {
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

  return club
}

export const deleteClub = async (clubId: string): Promise<boolean> => {
  const deleted = await Club.destroy({
    where: {id: clubId}
  })

  return deleted > 0
}

export const addUserToClub = async (userId: string, clubId: string): Promise<User> => {
  const user = await User.findOne({
    where: {id: userId}
  })

  if (!user) {
    return Promise.reject({message: "Could not find user"})
  }

  const club = await Club.findOne({
    where: {id: clubId}
  })

  if (!club) {
    return Promise.reject({message: "Could not find club"})
  }

  // @ts-expect-error: model associations not set
  const updatedUser = await user.setClub(club)

  return updatedUser
}