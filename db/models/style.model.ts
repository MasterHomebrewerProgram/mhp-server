import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Scoresheet from './scoresheet.model'

interface StyleAttributes {
  id: string
  cat: string
  subcat: string
  name: string
}

export interface StyleInput extends Optional<
StyleAttributes,
  'id'
> {}
export interface StyleOutput extends Required<StyleAttributes> {}

class Style extends Model<StyleAttributes, StyleInput> implements StyleAttributes {
  public id!: string
  public cat!: string
  public subcat!: string
  public name!: string

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Style.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  cat: {
    type: DataTypes.STRING
  },
  subcat: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.TEXT
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Style