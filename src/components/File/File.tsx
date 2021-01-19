import React from "react";
import "./file.scss";

export enum FILE_TYPE {
  PDF = "pdf",
  txt = "txt",
}

type FileProps = {
  fileType?: FILE_TYPE;
  fileName?: string;
  image?: string;
  fileSize?: string;
  onDelete?: () => void;
};

export const File = ({
  fileType,
  fileName,
  image,
  fileSize,
  onDelete,
}: FileProps) => {
  return (
    <div className="file">
      {image && !fileType && (
        <img className="file__img" alt="file-img" src={image} />
      )}
      {fileType && !image && (
        <div className={`file__type file__type_${fileType}`}>{fileType}</div>
      )}
      <div>
        <span className="file__title">{fileName}</span>
        <div className="file__misc">
          <span className="file__misc_size">{fileSize}</span>
          <span className="file__misc_delete" onClick={onDelete}>
            {fileName && "Delete"}
          </span>
        </div>
      </div>
    </div>
  );
};
