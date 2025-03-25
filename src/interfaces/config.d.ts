export interface ConfigProps {
  aws: {
    accessKeyId: string;
    secretAccessKey: string
    region: string
    bucketName: string
  }
  gcp: {
    geminiApiKey: string
  }
}