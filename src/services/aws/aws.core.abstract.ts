

//@INFO Singleton de la instancia con S3
export default abstract class AwsInstance {

  constructor() {
  }

  static validateExistenceCredentials = () => {
    let status = true;

    if (!process?.env?.AWS_ACCESS_KEY_ID) {
      console.log('CREDENTIALS: aws accessKeyId not found')
      status = false;
    }

    if (!process?.env?.AWS_SECRET_ACCESS_KEY) {
      console.log('CREDENTIALS: aws secretAccessKey not found')
      status = false;
    }

    if (!process?.env?.AWS_REGION) {
      console.log('CREDENTIALS: aws region not found')
      status = false;
    }

    return status;
  }
}