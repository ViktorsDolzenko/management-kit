import React, { useEffect, useState } from "react";

import { FileItemsTypes } from "./fileType";

import "./files.scss";
import { auth } from "Service/firebase";

interface FileProps {
  files: FileItemsTypes[];
  onDelete: (fileId: number, taskId: number) => void;
  taskId: number;
}

export const Files = ({ files, onDelete, taskId }: FileProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <div className="files">
      {files.map(({ id, fileType, image, fileName, fileSize, fileUrl }) => {
        return (
          <div className="file" key={fileName}>
            {fileUrl && (
              <a href={fileUrl} download>
                {image && !fileType && (
                  <img className="file__img" alt="file-img" src={image} />
                )}
                {fileType && !image && (
                  <div className={`file__type file__type_${fileType}`}>
                    {fileType}
                  </div>
                )}
              </a>
            )}
            <div>
              <span className="file__title">{fileName}</span>
              <div className="file__misc">
                <span className="file__misc_size">
                  {(Number(fileSize) / 1024).toFixed(1)} KB
                </span>
                {currentUser?.emailVerified && (
                  <button
                    className="file__misc_delete"
                    onClick={() => onDelete(id, taskId)}
                  >
                    {fileName && "Delete"}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
