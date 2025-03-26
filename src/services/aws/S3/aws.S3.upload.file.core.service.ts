import { GeneratePresignedFiles } from 'src/app/upload-file/dto/generateSignedUrl';
import { config } from 'src/config/config';
import AwsS3 from './aws.s3.core.singleton';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

class AwsS3UploadFileService {
  private class_name: string = "AwsS3UploadFileService";

  static default_conditions = [
    ["content-length-range", 0, 1000000000], //tamano del archivo
  ]


  constructor() {
  }

  /**
   * Metodo para generar la firma de los archivos que se van a subir a S3
   * @param _params 
   * @returns 
   */
  public async generatePresignedFiles(_params: GeneratePresignedFiles.Request): Promise<GeneratePresignedFiles.Response[]> {

    //Bucket en el que se va a guardar el archivo
    const bucket_name = config().aws.bucketName;
    if (!bucket_name) throw 'no se ha configurado el bucket donde se guardaran los archivos';

    //@INFO Generamos la firma de cada archivo
    const promises: Promise<GeneratePresignedFiles.Response>[] = _params?.files_data?.map(_e => this.generatePresigned(_e));
    const data: GeneratePresignedFiles.Response[] = await Promise.all(promises);

    return data;
  }



  /**
   * Metodo para generar la firma de un archivo
   * @param param0 
   * @returns 
   */
  private generatePresigned = async ({ id, folder = 'default_folder', contentType }: GeneratePresignedFiles.FileData): Promise<GeneratePresignedFiles.Response> => {
    const bucket_name = config().aws.bucketName;
    const file_name = this.uuid();
    const file_path = `${folder}/${file_name}`;

    const instance_aws = await AwsS3.getInstance();

    const response = await createPresignedPost(instance_aws.s3, {
      Bucket: bucket_name,
      Key: file_path,
      Fields: {
        "Content-Type": contentType,
        acl: "public-read",
      },
      Expires: 1800,
      Conditions: [
        ["content-length-range", 0, 10 * 1024 * 1024]
      ]
    });

    return {
      id,
      data: response,
      file_path,
      url_download: `https://${bucket_name}.s3.${config().aws.region}.amazonaws.com/${file_path}`
    };
  };

  uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

}

export default new AwsS3UploadFileService();