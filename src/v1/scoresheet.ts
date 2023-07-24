import express, { Request } from "express";
import { SanitizedUserOutput, ScoresheetInput } from "../../db/models";
import { ContentType, generateSignedUploadUrl } from "../../s3";
import Scoresheet from "../../db/models/scoresheet.model";

const router = express.Router();

interface CreateScoresheetRequest extends Request {
  body: ScoresheetInput & {
    mimetype: ContentType;
    StyleId: string;
    CompId: string;
  };
}

router.post("/upload", async (req: CreateScoresheetRequest, res) => {
  const user = req.user as SanitizedUserOutput;
  const scoresheetParams = {
    ...req.body,
    approved: false,
    UserId: user.id,
  };

  try {
    const newScoresheet = await Scoresheet.create({
      ...scoresheetParams,
    });

    const fileExtension = scoresheetParams.mimetype.split("/").length
      ? scoresheetParams.mimetype.split("/")[1]
      : scoresheetParams.mimetype;

    const s3Link = await generateSignedUploadUrl({
      Bucket: "scoresheets",
      Key: `${newScoresheet.id}.${fileExtension}`,
      ContentType: scoresheetParams.mimetype,
    });

    const updatedScoresheet = await newScoresheet.update({
      s3: `scoresheets/${newScoresheet.id}.${fileExtension}`,
    });

    res.json({
      scoresheet: updatedScoresheet,
      uploadLink: s3Link,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

export default router;
