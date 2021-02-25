export enum FILE_TYPE {
  PDF = "pdf",
  txt = "txt",
}

export type FileItemsTypes = {
  id: number;
  fileType?: FILE_TYPE;
  fileName?: string;
  image?: string;
  fileSize?: string;
  fileUrl?: string;
  fileUploadedBy?: string;
  fileUploadDate?: string;
};
