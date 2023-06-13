import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

export interface RatingData {
  awards: {
    type: number;
    quality: number;
  };
  scoresheets: {
    rankedJudges: number;
    quality: number;
    legibility: number;
  };
  prizes: {
    quality: number;
    bosAward: number;
  };
  timeliness: {
    onSchedule: number;
    resultsPublished: number;
  };
  competitiveness: {
    difficulty: number;
  };
  registration: {
    ease: number;
  };
  comprehensiveness: {
    numTables: number;
    ciderMead: number;
  };
  awardCeremony: {
    livestream: number;
    conference: number;
  };
  delivery: {
    shipment: number;
    dropoff: number;
  };
  communication: {
    quality: number;
  };
}

export interface RatingAttributes {
  id: string;
  score: number;
  text?: string;
  data?: RatingData;
  isPublic?: Boolean;
  isAnonymous?: Boolean;
}

export interface RatingInput
  extends Optional<RatingAttributes, "id" | "text" | "data"> {}
export interface RatingOutput extends Required<RatingAttributes> {}

class Rating
  extends Model<RatingAttributes, RatingInput>
  implements RatingAttributes
{
  public id!: string;
  public score!: number;
  public text: string;
  public data: RatingData;
  public isPublic: Boolean;
  public isAnonymous: Boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Rating.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
    },
    data: {
      type: DataTypes.JSON,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isAnonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Rating;
