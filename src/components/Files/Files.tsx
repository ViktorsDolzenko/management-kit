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
      {files.map(({ id, fileType, image, fileName, fileSize }) => {
        return (
          <div className="file" key={fileName}>
            {image && !fileType && (
              <img className="file__img" alt="file-img" src={image} />
            )}
            {fileType && !image && (
              <div className={`file__type file__type_${fileType}`}>
                {fileType}
              </div>
            )}
            <div>
              <span className="file__title">{fileName}</span>
              <div className="file__misc">
                <span className="file__misc_size">{fileSize}</span>
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
