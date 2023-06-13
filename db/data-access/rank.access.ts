import Rank, {
  RankAttributes,
  RankInput,
  Rank_User,
  Rank_User_Attributes,
} from "../models/rank.model";
import User, { UserAttributes } from "../models/user.model";

export const getRankMetadataById = async (
  rankId: string
): Promise<RankAttributes> => {
  const rank = await Rank.findOne({
    where: { id: rankId },
  });

  if (!rank) {
    return Promise.reject({ message: "Could not find rank" });
  }

  return rank.get({ plain: true });
};

export const getRankMetadataByName = async (
  rankName: string
): Promise<RankAttributes> => {
  const rank = await Rank.findOne({
    where: { name: rankName },
  });

  if (!rank) {
    return Promise.reject({ message: "Could not find rank" });
  }

  return rank.get({ plain: true });
};

export const updateRankMetadata = async (
  rankId: string,
  rankData: RankInput
): Promise<RankAttributes> => {
  const rank = await Rank.findOne({
    where: { id: rankId },
  });

  if (!rank) {
    return Promise.reject({ message: "Could not find rank" });
  }

  rankData.id = undefined;

  await rank.update({
    ...rankData,
  });

  return rank.get({ plain: true });
};

export const addRankToUser = async (
  rankId: string,
  userId: string
): Promise<UserAttributes & { Club?: RankAttributes }> => {
  const user = await User.count({
    where: { id: userId },
  });

  if (!user) {
    return Promise.reject({ message: "Could not find user" });
  }

  const rank = await Rank.count({
    where: { id: rankId },
  });

  if (!rank) {
    return Promise.reject({ message: "Could not find club" });
  }

  await Rank_User.create({
    //@ts-expect-error RankId not exposed
    RankId: rankId,
    UserId: userId,
  });

  const updatedUser = await User.findOne({
    where: { id: userId },
    include: {
      model: Rank,
    },
  });

  if (!updatedUser) {
    return Promise.reject({ message: "Could not find user" });
  }

  return updatedUser.get({ plain: true });
};

export const removeRankFromUser = async (
  rankId: string,
  userId: string
): Promise<boolean> => {
  const numRemoved = await Rank_User.destroy({
    where: {
      // @ts-expect-error RankId not exposed
      RankId: rankId,
      UserId: userId,
    },
  });

  return numRemoved > 0;
};

export const approveRankForUser = async (
  rankId: string,
  userId: string,
  approverId: string
) => {
  const rankUser = await Rank_User.findOne({
    where: {
      //@ts-expect-error RankId not exposed
      RankId: rankId,
      UserId: userId,
    },
  });

  if (!rankUser) {
    return Promise.reject({
      message: "Could not find record of Rank with User",
    });
  }

  await rankUser.update({
    //@ts-expect-error approvedby not exposed
    approvedby: approverId,
    approved: true,
  });

  return rankUser.get({ plain: true });
};

export const getRanksByApprovalState = async (
  approved = true
): Promise<
  (Rank_User_Attributes & {
    User?: Partial<UserAttributes>;
    Rank?: RankAttributes;
  })[]
> => {
  const approvedRanks = await Rank_User.findAll({
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
        model: Rank,
      },
    ],
    raw: true,
    nest: true,
  });

  return approvedRanks;
};

export const getRanksByShipState = async (
  shouldShip = true,
  shipped = false
): Promise<
  (Rank_User_Attributes & {
    User?: Partial<UserAttributes>;
    Rank?: RankAttributes;
  })[]
> => {
  const shippable = await Rank_User.findAll({
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
        model: Rank,
      },
    ],
    raw: true,
    nest: true,
  });

  return shippable;
};

export const setRankShouldShipStatus = async (
  rankId: string,
  userId: string,
  shouldShip = true
): Promise<Rank_User_Attributes> => {
  const rankUser = await Rank_User.findOne({
    where: {
      //@ts-expect-error RankId not exposed
      RankId: rankId,
      UserId: userId,
    },
  });

  if (!rankUser) {
    return Promise.reject({
      message: "Could not find record of Rank with User",
    });
  }

  await rankUser.update({
    shouldShip,
  });

  return rankUser.get({ plain: true });
};

export const updateRankShippingStatus = async (
  rankId: string,
  userId: string,
  shipped: boolean,
  tracking?: string
): Promise<Rank_User_Attributes> => {
  const rankUser = await Rank_User.findOne({
    where: {
      //@ts-expect-error RankId not exposed
      RankId: rankId,
      UserId: userId,
    },
  });

  if (!rankUser) {
    return Promise.reject({
      message: "Could not find record of Rank with User",
    });
  }

  await rankUser.update({
    shipped,
    tracking,
  });

  return rankUser.get({ plain: true });
};

export const setRankRecievedStatus = async (
  rankId: string,
  userId: string,
  received: boolean
): Promise<Rank_User_Attributes> => {
  const rankUser = await Rank_User.findOne({
    where: {
      //@ts-expect-error RankId not exposed
      RankId: rankId,
      UserId: userId,
    },
  });

  if (!rankUser) {
    return Promise.reject({
      message: "Could not find record of Rank with User",
    });
  }

  await rankUser.update({
    received,
  });

  return rankUser.get({ plain: true });
};
