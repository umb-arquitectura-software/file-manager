
type GenerateSignedUrl = GeneratePresignedFiles.Request;

export default GenerateSignedUrl;

export namespace GeneratePresignedFiles {
  
  export interface FileData {
    id: string,
    folder: string,
    contentType: string
  }

  export interface Request {
    files_data: FileData[]
  }

  export interface Response {
    //Id del documento
    id: string;

    //Datos que usa el front pasa subir la imagen a s3
    data: PresignedPost;

    //Carpetas concatenadas junto a nomber del archvio
    file_path: string;

    //FORMATO https://${bucket_name}.s3.${process.env.region}.amazonaws.com/${file_path}
    url_download: string; 
  }
}