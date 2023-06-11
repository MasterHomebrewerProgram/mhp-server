import Award, {AwardAttributes, AwardInput, Award_User, Award_User_Attributes} from '../models/award.model'
import User, { UserAttributes } from '../models/user.model'

export const getAwardMetadataById = async (awardId: string): Promise<AwardAttributes> => {
  const award = await Award.findOne({
    where: {id: awardId}
  })

  if (!award) {
    return Promise.reject({message: "Could not find award"})
  }

  return award.get({plain: true})
}

export const getAwardMetadataByName = async (awardName: string): Promise<AwardAttributes> => {
  const award = await Award.findOne({
    where: {name: awardName}
  })

  if (!award) {
    return Promise.reject({message: "Could not find award"})
  }

  return award.get({plain: true})
}

export const updateAwardMetadata = async (awardId: string, awardData: AwardInput): Promise<AwardAttributes> => {
  const award = await Award.findOne({
    where: {id: awardId}
  })

  if (!award) {
    return Promise.reject({message: "Could not find award"})
  }

  awardData.id = undefined

  await award.update({
    ...awardData
  })

  return award.get({plain:true})
}



export const addAwardToUser = async (awardId: string, userId: string): Promise<UserAttributes & {Club?: AwardAttributes}> => {
  const user = await User.count({
    where: {id: userId}
  })

  if (!user) {
    return Promise.reject({message: "Could not find user"})
  }

  const award = await Award.count({
    where: {id: awardId}
  })

  if (!award) {
    return Promise.reject({message: "Could not find club"})
  }

  await Award_User.create({
    //@ts-expect-error AwardId not exposed
    "AwardId": awardId,
    "UserId": userId
  })

  const updatedUser = await User.findOne({
    where: {id: userId},
    include: {
      model: Award
    }
  })

  if (!updatedUser) {
    return Promise.reject({message: "Could not find user"})
  }

  return updatedUser.get({plain: true})
}

export const removeAwardFromUser = async (awardId: string, userId: string): Promise<boolean> => {
  const numRemoved = await Award_User.destroy({
    where: {
      // @ts-expect-error AwardId not exposed
      "AwardId": awardId,
      "UserId": userId
    }
  })

  return numRemoved > 0
}

export const approveAwardForUser = async (awardId: string, userId: string, approverId: string) => {
  const awardUser = await Award_User.findOne({
    where: {
      //@ts-expect-error AwardId not exposed
      "AwardId": awardId,
      "UserId": userId
    }
  })

  if (!awardUser) {
    return Promise.reject({message: "Could not find record of Award with User"})
  }

  await awardUser.update({
    //@ts-expect-error approvedby not exposed
    approvedby: approverId,
    approved: true
  })

  return awardUser.get({plain: true})
}


export const getAwardsByApprovalState = async (approved=true): Promise<(Award_User_Attributes & {User?: Partial<UserAttributes>, Award?: AwardAttributes})[]> => {
  const approvedAwards = await Award_User.findAll({
    where: {
      approved,
    },
    include: [
      {
        model: User,
        include: [
          'id',
          'email',
          'slug',
          'fname',
          'lname',
          'photourl',
          'address1',
          'address2',
          'address3',
          'city',
          'province',
          'postalCode',
          'country'
        ]
      },
      {
        model: Award
      }
    ],
    raw: true,
    nest: true
  }) 

  return approvedAwards
}

export const getAwardsByShipState = async (shouldShip=true, shipped=false): Promise<(Award_User_Attributes & {User?: Partial<UserAttributes>, Award?: AwardAttributes})[]> => {
  const shippable = await Award_User.findAll({
    where: {
      approved: true,
      shipped,
      shouldShip
    },
    include: [
      {
        model: User,
        include: [
          'id',
          'email',
          'slug',
          'fname',
          'lname',
          'photourl',
          'address1',
          'address2',
          'address3',
          'city',
          'province',
          'postalCode',
          'country'
        ]
      },
      {
        model: Award
      }
    ],
    raw: true,
    nest: true
  })

  return shippable
}

export const setAwardShouldShipStatus = async (awardId: string, userId: string, shouldShip=true): Promise<Award_User_Attributes> => {
  const awardUser = await Award_User.findOne({
    where: {
      //@ts-expect-error AwardId not exposed
      "AwardId": awardId,
      "UserId": userId
    }
  })

  if (!awardUser) {
    return Promise.reject({message: "Could not find record of Award with User"})
  }

  await awardUser.update({
    shouldShip
  })

  return awardUser.get({plain: true})
}

export const updateAwardShippingStatus = async (awardId: string, userId: string, shipped: boolean, tracking?: string): Promise<Award_User_Attributes> => {
  const awardUser = await Award_User.findOne({
    where: {
      //@ts-expect-error AwardId not exposed
      "AwardId": awardId,
      "UserId": userId
    }
  })

  if (!awardUser) {
    return Promise.reject({message: "Could not find record of Award with User"})
  }

  await awardUser.update({
    shipped,
    tracking
  })

  return awardUser.get({plain: true})
}

export const setAwardRecievedStatus = async (awardId: string, userId: string, received: boolean): Promise<Award_User_Attributes> => {
  const awardUser = await Award_User.findOne({
    where: {
      //@ts-expect-error AwardId not exposed
      "AwardId": awardId,
      "UserId": userId
    }
  })

  if (!awardUser) {
    return Promise.reject({message: "Could not find record of Award with User"})
  }

  await awardUser.update({
    received
  })

  return awardUser.get({plain: true})
}