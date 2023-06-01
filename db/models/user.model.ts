import bcrypt from "bcrypt"
import { DataTypes, Model, Optional } from 'sequelize'

import sequelizeConnection from '../config'
// import Club from './club.model';
// import Scoresheet from "./scoresheet.model";
// import Rank, { Rank_User } from "./rank.model";
// import Award, { Award_User } from "./award.model";
// import Comp from "./comp.model";
// import Circuit, {Comp_Circuit} from "./circuit.model";

interface UserAttributes {
  id: string;
  email: string;
  slug: string
  fname: string;
  lname: string;
  photourl?: string;
  bio?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;

  password: string;
  adminLevel: number;
  emailVerified?: boolean;
  emailVerificationCode?: string;
  passwordResetCode?: string;

  paid: boolean;
  paymentId: string;
  paymentDate: Date;
  paymentExpiry: Date;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface UserInput extends Optional<
  UserAttributes,
 'id' | 
 'photourl' |
 'bio' |
 'emailVerified' |
 'emailVerificationCode' |
 'passwordResetCode' |
 'password' |
 'paid' |
 'paymentId' |
 'paymentDate' |
 'paymentExpiry'
> {}
export interface UserOutput extends Required<UserAttributes> {}
export type SanitizedUserOutput = Omit<
  UserOutput, 
  "password" |
  "adminLevel" |
  "emailVerificationCode" |
  "passwordResetCode" |
  'paymentId' |
  "createdAt" |
  "updatedAt" |
  "deletedAt"
>

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string
  public email!: string
  public slug!: string
  public fname!: string
  public lname!: string
  public photourl: string
  public bio: string
  public address1: string;
  public address2: string;
  public address3: string;
  public city: string;
  public province: string;
  public postalCode: string;
  public country: string;

  public password!: string;
  public adminLevel!: number;
  public emailVerified: boolean;
  public emailVerificationCode: string;
  public passwordResetCode: string;

  public paid: boolean;
  public paymentId: string;
  public paymentDate: Date;
  public paymentExpiry: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public validatePassword: (password: string) => Promise<boolean>
  public hashPassword: (password: string) => Promise<string>
  public sanitize: () => Promise<SanitizedUserOutput>
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  fname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  photourl: {
    type: DataTypes.STRING
  },
  bio: {
    type: DataTypes.TEXT
  },
  address1: {
    type: DataTypes.STRING
  },
  address2: {
    type: DataTypes.STRING
  },
  address3: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  province: {
    type: DataTypes.STRING
  },
  postalCode: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
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

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adminLevel: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  emailVerified: {
    type: DataTypes.BOOLEAN
  },
  emailVerificationCode: {
    type: DataTypes.STRING
  },
  passwordResetCode: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection,
  paranoid: true,
  hooks: {
    beforeCreate: async function (user, options) {
      user.password = await user.hashPassword(user.password)
    }
  }
})

User.prototype.validatePassword = function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

User.prototype.hashPassword = async function(password: string): Promise<string> {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

User.prototype.sanitize = async function(): Promise<SanitizedUserOutput> {
  const user: UserOutput = await this.get({plain: true})

  delete user.password
  delete user.adminLevel
  delete user.emailVerificationCode
  delete user.passwordResetCode
  delete user.createdAt
  delete user.updatedAt
  delete user.deletedAt

  return user
}

export default User