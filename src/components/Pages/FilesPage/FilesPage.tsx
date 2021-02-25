import React, { useContext } from "react";
import { Layout } from "../../layout/Layout";
import "./filesPage.scss";
import "./";
import { StorageContext } from "../../../context/storage";
import { Tag } from "../../Tag";
import { Button } from "../../Button";
import { downloadIcon } from "../../../const";
import { BUTTON_TYPE } from "../../Button/buttonProps";
import { saveAs } from "file-saver";

export const FilesPage = () => {
  const { state } = useContext(StorageContext);

  const downloadFunc = async (fileUrl: string, fileName: string) => {
    const downloadResult = await fetch(fileUrl);
    const blob = await downloadResult.blob();
    saveAs(blob, fileName);
  };

  const tasksWithFiles = state.tasks.filter((task) => task.files);

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
