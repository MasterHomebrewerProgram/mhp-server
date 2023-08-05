import Star, {
  StarAttributes,
  StarInput,
  Star_User,
  Star_User_Attributes,
} from "../models/star.model";
import User, { UserAttributes } from "../models/user.model";

export const getStarMetadataById = async (
  starId: string
): Promise<StarAttributes> => {
  const star = await Star.findOne({
    where: { id: starId },
  });

  if (!star) {
    return Promise.reject({ message: "Could not find star" });
  }

  return star.get({ plain: true });
};

export const getStarMetadataByName = async (
  starName: string
): Promise<StarAttributes> => {
  const star = await Star.findOne({
    where: { name: starName },
  });

  if (!star) {
    return Promise.reject({ message: "Could not find star" });
  }

  return star.get({ plain: true });
};

export const updateStarMetadata = async (
  starId: string,
  starData: StarInput
): Promise<StarAttributes> => {
  const star = await Star.findOne({
    where: { id: starId },
  });

  if (!star) {
    return Promise.reject({ message: "Could not find star" });
  }

  starData.id = undefined;

  await star.update({
    ...starData,
  });

  return star.get({ plain: true });
};

export const addStarToUser = async (
  starId: string,
  userId: string,
  description: string,
  approved = false
): Promise<UserAttributes & { Club?: StarAttributes }> => {
  const user = await User.count({
    where: { id: userId },
  });

  if (!user) {
    return Promise.reject({ message: "Could not find user" });
  }

  const star = await Star.count({
    where: { id: starId },
  });

  if (!star) {
    return Promise.reject({ message: "Could not find club" });
  }

  await Star_User.create({
    //@ts-expect-error StarId not exposed
    StarId: starId,
    UserId: userId,
    description,
    approved,
  });

  const updatedUser = await User.findOne({
    where: { id: userId },
    include: {
      model: Star,
    },
  });

  if (!updatedUser) {
    return Promise.reject({ message: "Could not find user" });
  }

  return updatedUser.get({ plain: true });
};

export const removeStarFromUser = async (
  starUserId: string
): Promise<boolean> => {
  const numRemoved = await Star_User.destroy({
    where: { id: starUserId },
  });

  return numRemoved > 0;
};

export const approveStarForUser = async (
  starUserId: string,
  approverId: string
) => {
  const starUser = await Star_User.findOne({
    where: { id: starUserId },
  });

  if (!starUser) {
    return Promise.reject({
      message: "Could not find record of Star with User",
    });
  }

  await starUser.update({
    approvedby: approverId,
    approved: true,
  });

  return starUser.get({ plain: true });
};

export const getStarsByApprovalState = async (
  approved = true
): Promise<
  (Star_User_Attributes & {
    User?: Partial<UserAttributes>;
    Star?: StarAttributes;
  })[]
> => {
  const approvedStars = await Star_User.findAll({
    where: {
      approved,
    },
    include: [
      {
        model: User,
        include: [
          "id",
          "email",
          "slug",
          "fname",
          "lname",
          "photourl",
          "address1",
          "address2",
          "address3",
          "city",
          "province",
          "postalCode",
          "country",
        ],
      },
      {
        model: Star,
      },
    ],
    raw: true,
    nest: true,
  });

  return approvedStars;
};

export const getStarsByShipState = async (
  shouldShip = true,
  shipped = false
): Promise<
  (Star_User_Attributes & {
    User?: Partial<UserAttributes>;
    Star?: StarAttributes;
  })[]
> => {
  const shippable = await Star_User.findAll({
    where: {
      approved: true,
      shipped,
      shouldShip,
    },
    include: [
      {
        model: User,
        include: [
          "id",
          "email",
          "slug",
          "fname",
          "lname",
          "photourl",
          "address1",
          "address2",
          "address3",
          "city",
          "province",
          "postalCode",
          "country",
        ],
      },
      {
        model: Star,
      },
    ],
    raw: true,
    nest: true,
  });

  return shippable;
};

export const setStarShouldShipStatus = async (
  starUserId: string,
  shouldShip = true
): Promise<Star_User_Attributes> => {
  const starUser = await Star_User.findOne({
    where: { id: starUserId },
  });

  if (!starUser) {
    return Promise.reject({
      message: "Could not find record of Star with User",
    });
  }

  await starUser.update({
    shouldShip,
  });

  return starUser.get({ plain: true });
};

export const updateStarShippingStatus = async (
  starUserId: string,
  shipped: boolean,
  tracking?: string
): Promise<Star_User_Attributes> => {
  const starUser = await Star_User.findOne({
    where: { id: starUserId },
  });

  if (!starUser) {
    return Promise.reject({
      message: "Could not find record of Star with User",
    });
  }

  await starUser.update({
    shipped,
    tracking,
  });

  return starUser.get({ plain: true });
};

export const setStarRecievedStatus = async (
  starUserId: string,
  received: boolean
): Promise<Star_User_Attributes> => {
  const starUser = await Star_User.findOne({
    where: { id: starUserId },
  });

  if (!starUser) {
    return Promise.reject({
      message: "Could not find record of Star with User",
    });
  }

  await starUser.update({
    received,
  });

  return starUser.get({ plain: true });
};
