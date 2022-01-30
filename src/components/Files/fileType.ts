export enum FILE_TYPE {
  PDF = "pdf",
  TXT = "TXT",
  IMAGE_PNG = "image/png",
  IMAGE_JPEG = "image/jpeg",
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
