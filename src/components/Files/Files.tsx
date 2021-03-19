import React, { useContext, useEffect, useState } from "react";

import { ServerFileType } from "./fileType";

import { auth } from "Service/firebase";
import { deleteFileFromServer } from "../../reducers/files";
import { updateTasks } from "../../context/actions";
import { getTasks, StorageContext } from "../../context/storage";

import "./files.scss";

interface FileProps {
  files: ServerFileType[];
  taskId: number;
}

export const Files = ({ files, taskId }: FileProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const { dispatch } = useContext(StorageContext);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  const getAllTasks = async () => {
    const tasks = await getTasks();
    const preparedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isOpened: true };
      }
      return task;
    });
    dispatch(updateTasks(preparedTasks));
  };

  const deleteFile = async (taskId: number, file: ServerFileType) => {
    await deleteFileFromServer(taskId, file);
    await getAllTasks();
  };

  return (
    <div className="files">
      {files.map((file) => {
        return (
          <div className="file" key={file.fileName}>
            {file.fileUrl && (
              <a href={`${file.fileUrl}?alt=media`}>
                {file.image && !file.fileType && (
                  <img className="file__img" alt="file-img" src={file.image} />
                )}
                {file.fileType && !file.image && (
                  <div className={`file__type file__type_${file.fileType}`}>
                    {file.fileType}
                  </div>
                )}
              </a>
            )}
            <div>
              <span className="file__title">{file.fileName}</span>
              <div className="file__misc">
                <span className="file__misc_size">
                  {(Number(file.fileSize) / 1024).toFixed(1)} KB
                </span>
                {currentUser?.emailVerified && (
                  <button
                    className="file__misc_delete"
                    onClick={() => deleteFile(taskId, file)}
                  >
                    {file.fileName && "Delete"}
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
