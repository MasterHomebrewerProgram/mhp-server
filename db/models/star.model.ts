import { DataTypes, Model, Optional, Sequelize } from 'sequelize'
import sequelizeConnection from '../config'

export interface StarAttributes {
  id: string
  name: string
  description: string
  photourl?: string
  stl?: string
}

export interface StarInput extends Optional<
StarAttributes,
  'id'
> {}
export interface StarOutput extends Required<StarAttributes> {}

class Star extends Model<StarAttributes, StarInput> implements StarAttributes {
  public id!: string
  public name!: string
  public description!: string
  public photourl: string
  public stl: string

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Star.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  },
  photourl: {
    type: DataTypes.STRING
  },
  stl: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

// Join table for Star <-> user
export interface Star_User_Attributes {
  id: string;
  description: string;
  approved: boolean;
  shouldShip: boolean;
  shipped?: boolean;
  tracking?: string;
  received?: boolean;
}

export class Star_User extends Model<Star_User_Attributes> implements Star_User_Attributes {
  public id!: string
  public description!: string
  public approved!: boolean;
  public shouldShip!: boolean;
  public shipped: boolean;
  public tracking: string;
  public received: boolean

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Star_User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  approved: {
    type: DataTypes.BOOLEAN
  },
  shouldShip: {
    type: DataTypes.BOOLEAN
  },
  shipped: {
    type: DataTypes.BOOLEAN
  },
  tracking: {
    type: DataTypes.STRING
  },
  received: {
    type: DataTypes.BOOLEAN
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Star