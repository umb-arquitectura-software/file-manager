import { ConfigProps } from '../interfaces/config';
export const config = (): ConfigProps => ({
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.BUCKET_NAME,
  },
  gcp: {
    geminiApiKey: process.env.GEMINI_API_KEY,
  },
});