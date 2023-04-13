import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import User from './user.model';

interface ClubAttributes {
  id: string;
  name: string;
  url?: string;
  bio?: string;
  photourl?: string;
  city?: string;
  province?: string;
  country?: string;
}

export interface ClubInput extends Optional<
ClubAttributes,
 'id' | 
 'url' |
 'photourl' |
 'bio' |
 'city' |
 'province' |
 'country'
> {}
export interface ClubOutput extends Required<ClubAttributes> {}

class Club extends Model<ClubAttributes, ClubInput> implements ClubAttributes {
  public id!: string;
  public name!: string;
  public url: string;
  public bio: string;
  public photourl: string;
  public city: string;
  public province: string;
  public country: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Club.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT
  },
  bio: {
    type: DataTypes.TEXT
  },
  photourl: {
    type: DataTypes.TEXT
  },
  city: {
    type: DataTypes.TEXT
  },
  province: {
    type: DataTypes.TEXT
  },
  country: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

// Club.hasMany(User)

export default Club