import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import AwsInstance from "../aws.core.abstract";
import { config } from "src/config/config";

//@INFO Singleton de la instancia con S3
export default class AwsS3 extends AwsInstance {
  static instance: AwsS3;
  public s3: S3Client;

  private constructor() {
    super();
    this.s3 = this.makeInstance();
  }

  private makeInstance = () => {
    try {
      return new S3Client({
        region: config().aws.region,
        credentials: {
          accessKeyId: config().aws.accessKeyId,
          secretAccessKey: config().aws.secretAccessKey,
        },
      });
    } catch (error) {
      console.log("instance error ", error);
      throw error;
    }
  };

  static async getInstance() {
    if (!AwsInstance.validateExistenceCredentials()) {
      throw "Not AWS credentials to work";
    }

    if (!AwsS3.instance || !AwsS3.instance.s3) {
      AwsS3.instance = new AwsS3();
    } else {
      try {
        //@INFO Validar si la conexión con AWS sigue activa
        await AwsS3.instance.s3.send(new ListBucketsCommand({}));
      } catch (error) {
        // Manejar el error o reinicializar la instancia si es necesario
        AwsS3.instance = new AwsS3();
      }
    }

    return AwsS3.instance;
  }
}
