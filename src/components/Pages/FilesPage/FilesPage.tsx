import { saveAs } from "file-saver";
import React, { useContext, useEffect, useState } from "react";
import { downloadIcon } from "../../../const";
import { updateTasks } from "../../../context/actions";
import { getTasks, StorageContext } from "../../../context/storage";
import { Button } from "../../Button";
import { BUTTON_TYPE } from "../../Button/buttonProps";
import { ServerFileType, SORT_BY } from "../../Files/fileType";
import { Layout } from "../../layout/Layout";
import "./";
import "./filesPage.scss";

enum SORT_TYPE {
  DESC = "desc",
  ASC = "asc",
}

interface Sort {
  sortBy: SORT_BY;
  sortType: SORT_TYPE;
}

export const FilesPage = () => {
  const [sort, setSort] = useState<Sort>({
    sortBy: SORT_BY.NAME,
    sortType: SORT_TYPE.ASC,
  });

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

  // @ts-ignore
  const allFiles: ServerFileType[] = tasksWithFiles
    .map((task) => {
      return task.files;
    })
    .flat();

  const compare = (array: any, value: SORT_BY, sortType: SORT_TYPE) => {
    return array.sort((a: any, b: any) => {
      if (sortType === SORT_TYPE.ASC) {
        if (a[value] > b[value]) return 1;
      }

      if (sortType === SORT_TYPE.DESC) {
        if (a[value] < b[value]) return -1;
      }
      return 0;
    });
  };

  const sortedArray = compare(allFiles, sort.sortBy, sort.sortType);

  const sorting = (sortBy: SORT_BY) => {
    setSort({
      sortBy,
      sortType:
        sort.sortType === SORT_TYPE.ASC ? SORT_TYPE.DESC : SORT_TYPE.ASC,
    });
  };

  return (
    <Layout pageTitle="TodoEx Files">
      <div className="page-container__filesPage">
        <div className="filesPage">
          <table id="files">
            <tbody>
              <tr>
                <th />
                <th>
                  <b>{sort.sortType}</b>
                  <button onClick={() => sorting(SORT_BY.NAME)}>Name</button>
                </th>
                <th>
                  <button onClick={() => sorting(SORT_BY.SIZE)}>Size</button>
                </th>
                <th>Uploaded By</th>
                <th>Tag</th>
                <th>Date</th>
                <th />
                <th />
              </tr>

              {Boolean(sortedArray.length) &&
                sortedArray.map((file: ServerFileType) => {
                  return (
                    <tr key={file.fileName}>
                      <td className="">
                        <img
                          style={{ width: 100 }}
                          src={`${file.fileUrl}?alt=media`}
                          alt=""
                        />
                      </td>
                      <td className="filesPage__fileName">{file.fileName}</td>
                      <td>{(Number(file.fileSize) / 1024).toFixed(1)} KB</td>
                      <td>{file.fileUploadDate}</td>
                      {/*<td>*/}
                      {/*  <Tag type={task.tagType} title={task.tag} />*/}
                      {/*</td>*/}
                      <td>{file.fileUploadedBy}</td>
                      <td>
                        <Button title="Actions" />
                      </td>
                      <td>
                        <Button
                          type={BUTTON_TYPE.submit}
                          titleIcon={downloadIcon}
                          onClick={() =>
                            downloadFunc(
                              `${file.fileUrl}?alt=media`,
                              `${file.fileName}`
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
