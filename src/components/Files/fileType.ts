export enum FILE_TYPE {
  PDF = "pdf",
  txt = "txt",
}

// TODO: delete after rewrite to fireface files
export type FileItemsTypes = {
  id: number;
  fileType?: FILE_TYPE;
  fileName?: string;
  image?: string;
  fileSize?: number;
  fileUrl?: string;
  fileUploadedBy?: string;
  fileUploadDate?: string;
};

export type ServerFileType = {
  fileType?: FILE_TYPE;
  fileName?: string;
  image?: string;
  fileSize?: number;
  fileUrl?: string;
  fileUploadedBy?: string;
  fileUploadDate?: string;
};

export enum SORT_BY {
  IMAGE = "image",
  NAME = "fileName",
  SIZE = "fileSize",
  UPLOADED_BY = "fileUploadedBy",
  DATE = "fileUploadDate",
}
