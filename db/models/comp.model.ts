import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Club from "./club.model";
import Scoresheet from "./scoresheet.model";

export interface CompAttributes {
  id: string;
  name: string;
  url?: string;
  description?: string;
  photourl?: string;
  city?: string;
  province?: string;
  country?: string;
  entryOpenDate?: Date;
  entryCloseDate?: Date;
  ceremonyDate?: Date;
}

export interface CompInput
  extends Optional<
    CompAttributes,
    "id" | "url" | "photourl" | "description" | "city" | "province" | "country"
  > {}
export interface CompOutput extends Required<CompAttributes> {}

class Comp extends Model<CompAttributes, CompInput> implements CompAttributes {
  public id!: string;
  public name!: string;
  public url: string;
  public description: string;
  public photourl: string;
  public city: string;
  public province: string;
  public country: string;
  public entryOpenDate?: Date;
  public entryCloseDate?: Date;
  public ceremonyDate?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Comp.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    url: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    photourl: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.TEXT,
    },
    province: {
      type: DataTypes.TEXT,
    },
    country: {
      type: DataTypes.TEXT,
    },
    entryOpenDate: {
      type: DataTypes.DATE,
    },
    entryCloseDate: {
      type: DataTypes.DATE,
    },
    ceremonyDate: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Comp;
