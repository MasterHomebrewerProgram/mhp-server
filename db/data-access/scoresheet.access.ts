import { Sequelize } from "sequelize";
import Scoresheet, {
  ScoresheetAttributes,
  ScoresheetInput,
} from "../models/scoresheet.model";
import User, { UserAttributes } from "../models/user.model";
import { Style } from "../models";

const approverAttributes = {
  model: User,
  as: "Approver",
  foreignKey: "approvedby",
  attributes: ["id", "slug", "fname", "lname", "photoUrl"],
};

const styleAttributes = {
  model: Style,
};

const userFkOptions = [
  approverAttributes,
  { model: User, attributes: ["id", "slug", "fname", "lname", "photoUrl"] },
];

export const getUserScoresheets = async (
  userId: string
): Promise<(ScoresheetAttributes & { Approver?: UserAttributes })[]> => {
  const scoresheets = await Scoresheet.findAll({
    //@ts-ignore
    where: { UserId: userId },
    include: [approverAttributes, styleAttributes],
  });

  return scoresheets.map((scoresheet) => {
    return scoresheet.get({ plain: true });
  });
};

export const getScoresheet = async (
  scoresheetId: string
): Promise<
  ScoresheetAttributes & { User?: UserAttributes; Approver?: UserAttributes }
> => {
  const scoresheet = await Scoresheet.findOne({
    where: { id: scoresheetId },
    include: userFkOptions,
  });

  if (!scoresheet) {
    return Promise.reject({ message: "Could not find scoresheet" });
  }

  return scoresheet.get({ plain: true });
};

export const createScoresheet = async (
  scoresheetData: ScoresheetInput
): Promise<ScoresheetAttributes> => {
  scoresheetData.approvedby = undefined;

  const scoresheet = await Scoresheet.create({
    ...scoresheetData,
  });

  return scoresheet.get({ plain: true });
};

export const approveScoresheet = async (
  scoresheetId: string,
  approverId: string
): Promise<ScoresheetAttributes & { User?: User; Approver?: User }> => {
  const scoresheet = await Scoresheet.findOne({
    where: { id: scoresheetId },
    include: userFkOptions,
  });

  if (!scoresheet) {
    return Promise.reject({ message: "Could not find scoresheet" });
  }

  await scoresheet.update({
    approvedby: approverId,
  });

  return scoresheet.get({ plain: true });
};

export const updateScoresheet = async (
  scoresheetData: Partial<ScoresheetInput>
): Promise<ScoresheetAttributes & { User?: User; Approver?: User }> => {
  scoresheetData.approvedby = undefined;

  const scoresheet = await Scoresheet.findOne({
    where: { id: scoresheetData.id },
    // include: userFkOptions,
  });

  if (!scoresheet) {
    return Promise.reject({ message: "Could not find scoresheet" });
  }

  await scoresheet.update({
    ...scoresheetData,
  });

  return scoresheet.get({ plain: true });
};

export const deleteScoresheet = async (
  scoresheetId: string
): Promise<boolean> => {
  const deleted = await Scoresheet.destroy({
    where: { id: scoresheetId },
  });

  return deleted > 0;
};
