import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { saveAs } from "file-saver";

import { arrowDownIcon, arrowUpIcon, downloadIcon } from "../../../const";
import { updateTasks } from "../../../context/actions";
import { getTasks, StorageContext } from "../../../context/storage";
import { Button, BUTTON_STYLE } from "../../Button";
import { BUTTON_TYPE } from "../../Button/buttonProps";
import { FILE_TYPE, ServerFileType, SORT_BY } from "../../Files/fileType";
import { Layout } from "../../layout/Layout";

import "./";
import "./filesPage.scss";
import { deleteFileFromServer } from "../../../reducers/files";
import { Tag } from "../../Tag";
import { tagType } from "../../../utils";
import { useTranslation } from "react-i18next";
import { auth, db } from "../../../Service/firebase";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/react";
import { NoAccess } from "../../NoAccess";

enum SORT_TYPE {
  DESC = "desc",
  ASC = "asc",
}

interface Sort {
  sortBy: SORT_BY;
  sortType: SORT_TYPE;
}

const override = css`
  display: block;
  position: fixed;
  top: 50%;
  left: 50%;
`;

export const FilesPage = () => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [subscription, setSubscription] = useState<Boolean>(false);
    const [loading, setLoading] = useState<any>(false);

    const [sort, setSort] = useState<Sort>({
        sortBy: SORT_BY.NAME,
        sortType: SORT_TYPE.ASC
    });

    const { state, dispatch } = useContext(StorageContext);

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

    const compare = (
        array: ServerFileType[],
        value: SORT_BY,
        sortType: SORT_TYPE
    ) => {
        return array.sort((a: any, b: any) => {
            if (sortType === SORT_TYPE.ASC) {
                if (value === SORT_BY.SIZE) {
                    return a[value] - b[value];
                } else if (a[value] > b[value]) {
                    return -1;
                }
            }

            if (sortType === SORT_TYPE.DESC) {
                if (value === SORT_BY.SIZE) {
                    return b[value] - a[value];
                } else if (a[value] < b[value]) {
                    return -1;
                }
            }
            return 0;
        });
    };

    const sortedArray = compare(allFiles, sort.sortBy, sort.sortType);

    const sorting = (sortBy: SORT_BY) => {
        setSort({
            sortBy,
            sortType:
        sort.sortType === SORT_TYPE.ASC ? SORT_TYPE.DESC : SORT_TYPE.ASC
        });
    };

    const getAllTasks = async () => {
        const tasks = await getTasks();
        dispatch(updateTasks(tasks));
    };

    const getUserInfo = async () => {
        const userUid = currentUser?.uid;
        const user = await db.collection("users").doc(`${userUid}`).get();
        const userField = user.data();
        setSubscription(userField?.subscription);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            getUserInfo();
            getAllTasks();
        });
    }, [currentUser, subscription]);

    const deleteFile = async (taskId: number, file: ServerFileType) => {
        await deleteFileFromServer(taskId, file);
        await getAllTasks();
    };

    const { t } = useTranslation();


    return (
        <Layout pageTitle="TodoEx Files">
            {loading ? <div className="blur">
                <BeatLoader color="#ffffff" loading={loading} css={override} size={50}/>
            </div> :
                <>
                    {!sortedArray.length ?
                        <h1 className="noFiles">{t("phrases.noFiles")}</h1> :
                        <div className="page-container__filesPage">
                            {subscription ?
                                <div className="filesPage">
                                    <table id="files">
                                        <tbody>
                                            <tr>
                                                <th>{t("phrases.image")}</th>
                                                <th>
                                                    <Button
                                                        onClick={() => sorting(SORT_BY.NAME)}
                                                        title="name"
                                                        category={BUTTON_STYLE.Light}
                                                        titleIcon={
                                                            sort.sortType === SORT_TYPE.ASC ?
                                                                arrowUpIcon :
                                                                arrowDownIcon
                                                        }
                                                    />
                                                </th>
                                                <th>
                                                    <Button
                                                        onClick={() => sorting(SORT_BY.SIZE)}
                                                        title="size"
                                                        category={BUTTON_STYLE.Light}
                                                        titleIcon={
                                                            sort.sortType === SORT_TYPE.ASC ?
                                                                arrowUpIcon :
                                                                arrowDownIcon
                                                        }
                                                    />
                                                </th>
                                                <th>
                                                    <Button
                                                        onClick={() => sorting(SORT_BY.UPLOADED_BY)}
                                                        title="uploadedBy"
                                                        category={BUTTON_STYLE.Light}
                                                        titleIcon={
                                                            sort.sortType === SORT_TYPE.ASC ?
                                                                arrowUpIcon :
                                                                arrowDownIcon
                                                        }
                                                    />
                                                </th>
                                                <th>Tag</th>
                                                <th>
                                                    <Button
                                                        onClick={() => sorting(SORT_BY.DATE)}
                                                        title="date"
                                                        category={BUTTON_STYLE.Light}
                                                        titleIcon={
                                                            sort.sortType === SORT_TYPE.ASC ?
                                                                arrowUpIcon :
                                                                arrowDownIcon
                                                        }
                                                    />
                                                </th>
                                                <th>{t("phrases.actions")}</th>
                                                <th>{t("phrases.download")}</th>
                                            </tr>
                                            {Boolean(sortedArray.length) &&
                                        sortedArray.map((file: ServerFileType) => {
                                            return (
                                                <tr key={file.fileName}>
                                                    <td>
                                                        {file.fileType === FILE_TYPE.IMAGE_PNG ||
                                                        file.fileType === FILE_TYPE.IMAGE_JPEG ? (
                                                                <a href={`${file.fileUrl}?alt=media`}>
                                                                    <img
                                                                        className="filesPage__images"
                                                                        alt="file-img"
                                                                        src={`${file.fileUrl}?alt=media`}
                                                                    />
                                                                </a>
                                                            ) : (
                                                                <div
                                                                    className={`filesPage__type filesPage__type_${file.fileType}`}
                                                                >
                                                                    {file.fileType}
                                                                </div>
                                                            )}
                                                    </td>
                                                    <td className="filesPage__fileName">{file.fileName}</td>
                                                    <td>{(Number(file.fileSize) / 1024).toFixed(1)} KB</td>
                                                    <td>{file.fileUploadedBy}</td>
                                                    <td>
                                                        {
                                                            <Tag
                                                                type={tagType(file.fileTag)}
                                                                title={file.fileTag}
                                                            />
                                                        }
                                                    </td>
                                                    <td>
                                                        {moment(file.fileUploadDate).format("DD/MM/YYYY")}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            title="delete"
                                                            onClick={() => deleteFile(file.taskID, file)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button
                                                            type={BUTTON_TYPE.Submit}
                                                            titleIcon={downloadIcon}
                                                            title={''}
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
                                </div> :
                                <NoAccess userName={currentUser?.displayName}/>}
                        </div>
                    }
                </>
            }
        </Layout>
    );
};
