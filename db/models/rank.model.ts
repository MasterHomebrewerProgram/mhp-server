import { DataTypes, Model, Optional, Sequelize } from 'sequelize'
import sequelizeConnection from '../config'
import User from './user.model'

interface RankAttributes {
  id: string
  name: string
  description: string
  photourl?: string
  priority: number
}

export interface RankInput extends Optional<
RankAttributes,
  'id'
> {}
export interface RankOutput extends Required<RankAttributes> {}

class Rank extends Model<RankAttributes, RankInput> implements RankAttributes {
  public id!: string
  public name!: string
  public description!: string
  public photourl: string
  public priority: number

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Rank.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  photourl: {
    type: DataTypes.STRING
  },
  priority: {
    type: DataTypes.INTEGER
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

// Join table for rank <-> user
interface Rank_User_Attributes {
  id: string;
  approved: boolean;
  shouldShip: boolean;
  shipped?: boolean;
  tracking?: string;
  received?: boolean;
}

export class Rank_User extends Model<Rank_User_Attributes> implements Rank_User_Attributes {
  public id!: string
  public approved!: boolean;
  public shouldShip!: boolean;
  public shipped: boolean;
  public tracking: string;
  public received: boolean

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Rank_User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
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

export default Rank