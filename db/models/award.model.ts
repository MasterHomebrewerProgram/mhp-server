import { DataTypes, ForeignKey, Model, Optional, Sequelize } from "sequelize";
import sequelizeConnection from "../config";
import Scoresheet from "./scoresheet.model";
import Style from "./style.model";
import User from "./user.model";

export interface AwardAttributes {
  id: string;
  name: string;
  description: string;
  photourl?: string;
  stl?: string;
  categoryList: string[];
  minScore: number;
  minRequired: number;
  preventCategoryDuplicates?: boolean;
}

export interface AwardProgress {
  achieved: boolean;
  sheetsApproved?: boolean;
  requirements?: {
    description: string;
    categories?: string[];
    completed: number;
    total: number;
  }[];
}

export interface AwardInput extends Optional<AwardAttributes, "id"> {}
export interface AwardOutput extends Required<AwardAttributes> {}

class Award
  extends Model<AwardAttributes, AwardInput>
  implements AwardAttributes
{
  public id!: string;
  public name!: string;
  public description!: string;
  public photourl: string;
  public stl: string;
  public categoryList: string[];
  public minScore: number;
  public minRequired: number;
  public preventCategoryDuplicates?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public checkAwards: (
    scoresheets: Array<Scoresheet & { Style: Style }>
  ) => AwardProgress;
}

Award.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    photourl: {
      type: DataTypes.STRING,
    },
    stl: {
      type: DataTypes.STRING,
    },
    categoryList: {
      type: DataTypes.JSON,
    },
    minScore: {
      type: DataTypes.STRING,
    },
    minRequired: {
      type: DataTypes.STRING,
    },
    preventCategoryDuplicates: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

// Join table for Award <-> user
export interface Award_User_Attributes {
  id: string;
  achieved: boolean;
  achievedAt: Date;
  requirements?: AwardProgress["requirements"];
  approved: boolean;
  approvedby: string;
  shouldShip: boolean;
  shipped?: boolean;
  tracking?: string;
  received?: boolean;
}

export class Award_User
  extends Model<Award_User_Attributes>
  implements Award_User_Attributes
{
  public id!: string;
  public achieved!: boolean;
  public achievedAt: Date;
  public requirements: AwardProgress["requirements"];
  public approved!: boolean;
  declare approvedby: ForeignKey<User["id"]>;
  public shouldShip!: boolean;
  public shipped: boolean;
  public tracking: string;
  public received: boolean;

  declare UserId: ForeignKey<User["id"]>;
  declare AwardId: ForeignKey<Award["id"]>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Award_User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    achieved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    achievedAt: {
      type: DataTypes.DATE,
    },
    requirements: {
      type: DataTypes.JSON,
    },
    approved: {
      type: DataTypes.BOOLEAN,
    },
    approvedby: {
      type: DataTypes.UUID,
    },
    shouldShip: {
      type: DataTypes.BOOLEAN,
    },
    shipped: {
      type: DataTypes.BOOLEAN,
    },
    tracking: {
      type: DataTypes.STRING,
    },
    received: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Award;
