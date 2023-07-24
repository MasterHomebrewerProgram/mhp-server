import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import User from "./user.model";
import Style from "./style.model";
import Comp from "./comp.model";

export interface ScoresheetAttributes {
  id: string;
  score: number;
  approved: boolean;
  approvedby: string;
  s3: string;
}

export interface ScoresheetInput
  extends Optional<
    ScoresheetAttributes,
    "id" | "approved" | "approvedby" | "s3"
  > {}
export interface ScoresheetOutput extends Required<ScoresheetAttributes> {}

class Scoresheet
  extends Model<ScoresheetAttributes, ScoresheetInput>
  implements ScoresheetAttributes
{
  public id!: string;
  public score: number;
  public approved: boolean;
  public approvedby: string;
  public s3: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  declare UserId: ForeignKey<User["id"]>;
  declare StyleId: ForeignKey<Style["id"]>;
  declare CompId: ForeignKey<Comp["id"]>;
}

Scoresheet.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
    },
    approved: {
      type: DataTypes.BOOLEAN,
    },
    approvedby: {
      type: DataTypes.UUID,
    },
    s3: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Scoresheet;
