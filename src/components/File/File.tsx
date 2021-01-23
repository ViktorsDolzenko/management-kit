import React from "react";
import "./file.scss";
import { FileItemsTypes } from "./fileType";
import { taskItemsType } from "../Tasks/taskItems";

interface FileProps {
  files: FileItemsTypes[];
  onDelete: (id: number, task: taskItemsType) => void;
  task: taskItemsType;
}

export const File = ({ files, onDelete, task }: FileProps) => {
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
                <button
                  className="file__misc_delete"
                  onClick={() => onDelete(id, task)}
                >
                  {fileName && "Delete"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
