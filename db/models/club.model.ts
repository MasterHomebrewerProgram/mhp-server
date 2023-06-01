import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface ClubAttributes {
  id: string;
  name: string;
  slug: string;
  url?: string;
  bio?: string;
  photourl?: string;
  city?: string;
  province?: string;
  country?: string;

  paid: boolean;
  paymentId: string;
  paymentDate: Date;
  paymentExpiry: Date;
}

export interface ClubInput extends Optional<
ClubAttributes,
 'id' | 
 'url' |
 'photourl' |
 'bio' |
 'city' |
 'province' |
 'country' |
 'paid' |
 'paymentId' |
 'paymentDate' |
 'paymentExpiry'
> {}
export interface ClubOutput extends Required<ClubAttributes> {}

class Club extends Model<ClubAttributes, ClubInput> implements ClubAttributes {
  public id!: string;
  public name!: string;
  public slug!: string;
  public url: string;
  public bio: string;
  public photourl: string;
  public city: string;
  public province: string;
  public country: string;

  public paid: boolean;
  public paymentId: string;
  public paymentDate: Date;
  public paymentExpiry: Date;

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
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  },

  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  paymentId: {
    type: DataTypes.STRING
  },
  paymentDate: {
    type: DataTypes.DATE
  },
  paymentExpiry: {
    type: DataTypes.DATE
  },
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

interface Club_User_Attributes {
  id: string,
  clubAdmin: number
}

export class Club_User extends Model<Club_User_Attributes> implements Club_User_Attributes {
  public id!: string
  public clubAdmin: number

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Club_User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  clubAdmin: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true
})

export default Club