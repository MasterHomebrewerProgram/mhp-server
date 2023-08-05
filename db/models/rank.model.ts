import { DataTypes, ForeignKey, Model, Optional, Sequelize } from "sequelize";
import sequelizeConnection from "../config";
import User from "./user.model";

export interface RankAttributes {
  id: string;
  name: string;
  description: string;
  photourl?: string;
  stl?: string;
  priority: number;
  minScore?: number;
  minSubcats?: number;
  minCats?: number;
  minSlmc?: number;
  minLagers?: number;
  minSours?: number;
  minMixedSours?: number;
  minMeads?: number;
  minCiders?: number;
}

export interface RankProgress {
  achieved: boolean;
  sheetsApproved?: boolean;
  requirements?: {
    description: string;
    categories?: string[];
    completed: number;
    total: number;
  }[];
}

export interface RankInput extends Optional<RankAttributes, "id"> {}
export interface RankOutput extends Required<RankAttributes> {}

class Rank extends Model<RankAttributes, RankInput> implements RankAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public photourl: string;
  public stl: string;
  public priority: number;
  public minScore: number;
  public minSubcats: number;
  public minCats: number;
  public minSlmc: number;
  public minLagers: number;
  public minSours: number;
  public minMixedSours: number;
  public minMeads: number;
  public minCiders: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Rank.init(
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
    priority: {
      type: DataTypes.INTEGER,
    },
    minScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minSubcats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minCats: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minSlmc: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minLagers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minSours: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minMixedSours: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minMeads: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    minCiders: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

// Join table for rank <-> user
export interface Rank_User_Attributes {
  id: string;
  achieved: boolean;
  achievedAt: Date;
  requirements?: RankProgress["requirements"];
  approved: boolean;
  approvedby: string;
  shouldShip: boolean;
  shipped?: boolean;
  tracking?: string;
  received?: boolean;
}

export class Rank_User
  extends Model<Rank_User_Attributes>
  implements Rank_User_Attributes
{
  public id!: string;
  public achieved: boolean;
  public achievedAt: Date;
  public requirements: RankProgress["requirements"];
  public approved!: boolean;
  declare approvedby: ForeignKey<User["id"]>;
  public shouldShip!: boolean;
  public shipped: boolean;
  public tracking: string;
  public received: boolean;

  declare UserId: ForeignKey<User["id"]>;
  declare RankId: ForeignKey<Rank["id"]>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Rank_User.init(
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

export default Rank;
