import GenerateSignedUrl from "./generateSignedUrl";

export interface UploadFileService {
  generateSignedUrl(data: GenerateSignedUrl): Promise<any>;
  generateSignedUrlAI(data: any): Promise<any>;
}