import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../../layout/Layout";
import "./filesPage.scss";
import "./";
import { getTasks, StorageContext } from "../../../context/storage";
import { Tag } from "../../Tag";
import { Button } from "../../Button";
import { downloadIcon } from "../../../const";
import { BUTTON_TYPE } from "../../Button/buttonProps";
import { saveAs } from "file-saver";
import { updateTasks } from "../../../context/actions";
import { FileItemsTypes, SORT_BY } from "../../Files/fileType";

export const FilesPage = () => {
  const [sortBy, setSortBy] = useState<SORT_BY>(SORT_BY.DATE);

  const { state, dispatch } = useContext(StorageContext);

  const getAllTasks = async () => {
    const tasks = await getTasks();
    dispatch(updateTasks(tasks));
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const downloadFunc = async (fileUrl: string, fileName: string) => {
    const downloadResult = await fetch(fileUrl);
    const blob = await downloadResult.blob();
    saveAs(blob, fileName);
  };

  const tasksWithFiles = state.tasks.filter((task) => task.files);

  const allFiles = tasksWithFiles.map((task) => {
    return task.files;
  });

  const compare = (array: FileItemsTypes[], value: SORT_BY) => {
    return array.sort((a, b) => {
      if (a[value] && b[value]) {
        if (a[value] > b[value]) return 1;
        if (a < b) return -1;
      }
      return 0;
    });
  };

  const filesArray = allFiles.flat();

  const filesData = tasksWithFiles?.map((task) => {
    return task.files?.map(
      ({
        fileName,
        fileSize,
        fileType,
        fileUploadDate,
        fileUploadedBy,
        fileUrl,
      }) => {
        return (
          <tr key={fileName}>
            <td className="">{fileType}</td>
            <td className="filesPage__fileName">{fileName}</td>
            <td>{(Number(fileSize) / 1024).toFixed(1)} KB</td>
            <td>{fileUploadedBy}</td>
            <td>
              <Tag type={task.tagType} title={task.tag} />
            </td>
            <td>{fileUploadDate}</td>
            <td>
              <Button title="Actions" />
            </td>
            <td>
              <Button
                type={BUTTON_TYPE.submit}
                titleIcon={downloadIcon}
                onClick={() =>
                  downloadFunc(`${fileUrl}?alt=media`, `${fileName}`)
                }
              />
            </td>
          </tr>
        );
      }
    );
  });

  return (
    <Layout pageTitle="TodoEx Files">
      <div className="page-container__filesPage">
        <div className="filesPage">
          <table id="files">
            <tbody>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Size</th>
                <th>Uploaded By</th>
                <th>Tag</th>
                <th>Date</th>
                <th />
                <th />
              </tr>
              {filesData}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
