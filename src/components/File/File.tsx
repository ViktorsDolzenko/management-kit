import React from "react";

import "./file.scss";

export enum FILE_TYPE {
  PFD = "pdf",
  TXT = "txt",
}

type FileProps = {
  fileType?: FILE_TYPE;
  image?: string;
  fileName?: string;
  onDelete?: () => void;
  fileSize?: string;
};

export const File = ({
  fileType,
  fileName,
  fileSize,
  image,
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
        {fileName && <span className="file__title">{fileName}</span>}
        <div className="file__misc">
          {fileSize && <span className="file__misc_size">{fileSize}</span>}
          <button className="file__misc_delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
