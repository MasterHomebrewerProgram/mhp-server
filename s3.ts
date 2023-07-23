import {
  CreateBucketCommand,
  GetObjectCommand,
  ListBucketsCommand,
  PutObjectCommand,
  S3,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

let bucketEndpoint = process.env.BUCKET_ENDPOINT;
let bucketRegion = process.env.BUCKET_REGION;
let devSpacesKey = process.env.SPACES_KEY;
let devSpacesSecret = process.env.SPACES_SECRET;

if (process.env.NODE_ENV === "development") {
  bucketEndpoint = "http://127.0.0.1:9444/";
  bucketRegion = "us-east-1";
  devSpacesKey = "AKIAIOSFODNN7EXAMPLE";
  devSpacesSecret = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
}

const buckets = ["scoresheets", "avatars", "awards", "stls"] as const;
type BucketName = (typeof buckets)[number];

type ContentType =
  | "text"
  | "application/pdf"
  | "application/sla"
  | "image/gif"
  | "image/jpeg"
  | "image/png"
  | "image/tiff"
  | "image/vnd.microsoft.icon"
  | "image/x-icon"
  | "image/vnd.djvu"
  | "image/svg+xml";

const s3Client = new S3({
  forcePathStyle: !!process.env.NODE_ENV,
  endpoint: bucketEndpoint,
  region: bucketRegion,
  credentials: {
    accessKeyId: devSpacesKey || "",
    secretAccessKey: devSpacesSecret || "",
  },
});

const initS3 = async (): Promise<boolean> => {
  // Check if buckets exist, and if not, create missing buckets
  console.log("Checking for buckets");

  const data = await s3Client.send(new ListBucketsCommand({}));
  const existingBucketNames = data.Buckets?.map((bucket) => bucket.Name) || [];

  await Promise.all(
    buckets.map((bucketName) => {
      if (existingBucketNames.includes(bucketName)) {
        return Promise.resolve();
      }

      console.log(`Creating bucket ${bucketName}`);
      return s3Client.send(
        new CreateBucketCommand({
          Bucket: bucketName,
        })
      );
    })
  );

  return true;
};

const generateSignedUploadUrl = async (bucketParams: {
  Bucket: BucketName;
  Key: string;
  ContentType: ContentType;
}): Promise<string> => {
  const url = getSignedUrl(s3Client, new PutObjectCommand(bucketParams), {
    expiresIn: 15 * 60,
  });
  console.log(
    `Generated signed URL to upload ${bucketParams.Bucket}/${bucketParams.Key}: ${url}`
  );
  return url;
};

const generateSignedDownloadUrl = async (bucketParams: {
  Bucket: BucketName;
  Key: string;
}): Promise<string> => {
  const url = await getSignedUrl(s3Client, new GetObjectCommand(bucketParams), {
    expiresIn: 15 * 60,
  });
  console.log(
    `Generated signed URL to download ${bucketParams.Bucket}/${bucketParams.Key}: ${url}`
  );
  return url;
};

export { s3Client, initS3, generateSignedUploadUrl, generateSignedDownloadUrl };
