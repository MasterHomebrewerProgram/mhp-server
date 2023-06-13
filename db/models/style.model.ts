import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Scoresheet from "./scoresheet.model";

export interface StyleAttributes {
  id: string;
  cat: string;
  subcat: string;
  name: string;
  isCider?: boolean;
  isMead?: boolean;
  isLager?: boolean;
  isSour?: boolean;
}

export interface StyleInput extends Optional<StyleAttributes, "id"> {}
export interface StyleOutput extends Required<StyleAttributes> {}

class Style
  extends Model<StyleAttributes, StyleInput>
  implements StyleAttributes
{
  public id!: string;
  public cat!: string;
  public subcat!: string;
  public name!: string;
  public isCider?: boolean;
  public isMead?: boolean;
  public isLager?: boolean;
  public isSour?: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Style.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    cat: {
      type: DataTypes.STRING,
    },
    subcat: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
    },
    isCider: {
      type: DataTypes.BOOLEAN,
    },
    isMead: {
      type: DataTypes.BOOLEAN,
    },
    isLager: {
      type: DataTypes.BOOLEAN,
    },
    isSour: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    indexes: [
      {
        fields: ["cat", "subcat"],
        unique: true,
      },
    ],
  }
);

export default Style;
