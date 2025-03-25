import S3 from "aws-sdk/clients/s3"
import AwsInstance from "../aws.core.abstract";
import { config } from "src/config/config";


//@INFO Singleton de la instancia con S3
export default class AwsS3 extends AwsInstance {
  static instance: AwsS3;
  public s3: S3;


  private constructor() {
    super();
    this.s3 = this.makeInstance()
  }


  private makeInstance = () => new S3({
    apiVersion: "2006-03-01",
    signatureVersion: "v4",
    accessKeyId: config().aws.accessKeyId,
    secretAccessKey: config().aws.secretAccessKey,
    region: config().aws.region,
  });


  static async getInstance() {
    if (!AwsInstance.validateExistenceCredentials()) {
      throw 'Not aws credentials to work'
    }

    if (!AwsS3.instance || !AwsS3.instance.s3) {
      AwsS3.instance = new AwsS3();
    } else {

      try {
        //@INFO Validar si la conexion con aws sigue activa
        await AwsS3.instance.s3.listBuckets().promise();
      } catch (error) {
        // Manejar el error o reinicializar la instancia si es necesario
        AwsS3.instance = new AwsS3();
      }
    }

    return AwsS3.instance;
  }
}