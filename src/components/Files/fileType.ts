export enum FILE_TYPE {
  PDF = "pdf",
  txt = "txt",
  imagePng = "image/png",
  imageJpeg = "image/jpeg",
}

export type ServerFileType = {
  fileType: FILE_TYPE;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  fileUploadedBy: string;
  fileUploadDate: number;
  fileTag: string;
  taskID: number;
  image?: string;
};

export enum SORT_BY {
  IMAGE = "image",
  NAME = "fileName",
  SIZE = "fileSize",
  UPLOADED_BY = "fileUploadedBy",
  DATE = "fileUploadDate",
}
