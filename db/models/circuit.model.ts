import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import Comp from './comp.model';

interface CircuitAttributes {
  id: string;
  year: number;
}

export interface CircuitInput extends Optional<
CircuitAttributes,
 'id' | 
 'year'
> {}
export interface CircuitOutput extends Required<CircuitAttributes> {}

class Circuit extends Model<CircuitAttributes, CircuitInput> implements CircuitAttributes {
  public id!: string;
  public year!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Circuit.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

interface Comp_Circuit_Attributes {
  id: string
}

export class Comp_Circuit extends Model<Comp_Circuit_Attributes> implements Comp_Circuit_Attributes {
  public id!: string

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Comp_Circuit.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Circuit