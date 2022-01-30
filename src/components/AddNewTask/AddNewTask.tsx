import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { auth, db, storage, timestamp } from "Service/firebase";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";

import { Button, BUTTON_STYLE } from "components/Button";
import { TASK_TYPE } from "components/Tasks/taskItems";
import { BUTTON_TYPE } from "components/Button/buttonProps";
import { getTasks, StorageContext } from "context/storage";
import { updateTasks } from "context/actions";
import { getTaskNewId, tagOptions } from "utils";

import "./addNewTask.scss";
import { useTranslation } from "react-i18next";

interface AddNewTaskProps {
  onClickClose: () => void;
  taskType: TASK_TYPE;
}

interface uploadedFilesResponse {
  name: string;
  size: number;
  url: string;
  type: string;
}

export const AddNewTask = ({ onClickClose, taskType }: AddNewTaskProps) => {
    const { register, handleSubmit, control, getValues } = useForm();
    const { state, dispatch } = useContext(StorageContext);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [progressValue, setProgressValue] = useState(0);
    const [valueDescription, setValueDescription] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [uploadInfo, setUploadInfo] = useState("");
    const [filesLength, setFilesLength] = useState(0);

    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    }, [currentUser]);

    const getUsers = async () => {
        const usersDb = await db.collection("users").get();
        const usersWithId = usersDb.docs.map((doc) => {
            const allDoc = doc.data();
            return {
                ...allDoc,
                id: doc.id
            };
        });
        // @ts-ignore
        setAllUsers(usersWithId);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const uploadFiles = async (
        files: File[] | undefined
    ): Promise<uploadedFilesResponse[]> => {
        let filesLinks: uploadedFilesResponse[] = [];
        if (!files) return [];

        let uploadedFilesCount = 0;
        setUploadInfo("Please wait, files uploading...");
        for (const file of files) {
            if (file.size > Math.pow(1024, 2) * 5) {
                const fileSizeError = (file.size / Math.pow(1024, 2)).toFixed(1);
                // eslint-disable-next-line no-alert,no-undef
                alert(`Your file size is: ${fileSizeError}MB maximum size is 5 MB`);
            }
            const storageRef = storage.ref(
                `users/${currentUser.uid}/files/${file.name}`
            );
            const storageSnapshot = await storageRef.put(file);
            const fileUrl = await storageSnapshot.ref.getDownloadURL();

            uploadedFilesCount += 1;
            const percentage = Math.round((uploadedFilesCount / files.length) * 100);
            setProgressValue(percentage);

            const url = new URL(fileUrl);
            const preparedUrl = `${url.origin}${url.pathname}`;

            filesLinks.push({
                name: file.name,
                size: file.size,
                type: file.type,
                url: preparedUrl
            });
        }
        return filesLinks;
    };

    const onSubmit = async (data: any) => {
        const key = getTaskNewId(state.tasks);
        const filesUrls = await uploadFiles(data.files);
        const assignData = data.assignTo.value;

        await db
            .collection("tasks-collection")
            .doc("tasks")
            .update({
                [key]: {
                    done: false,
                    image: "https://svgshare.com/i/VFv.svg",
                    title: data.title,
                    tag: data.tag.value,
                    date: moment().format(" MMMM Do"),
                    addedBy: currentUser.displayName,
                    assign: assignData,
                    description: data.description,
                    type: taskType,
                    comments: [],
                    files: filesUrls.map((file) => {
                        return {
                            fileType: file.type,
                            fileName: file.name,
                            fileSize: file.size,
                            fileUrl: file.url,
                            fileUploadedBy: currentUser?.displayName,
                            fileUploadDate: timestamp.toDate().toDateString(),
                            fileTag: data.tag.value,
                            taskID: key
                        };
                    })
                }
            });
        const tasks = await getTasks();
        dispatch(updateTasks(tasks));
        onClickClose();
    };

    const customStyles = {
        control: (base: any) => ({
            ...base,
            background: "#eaeaea"
        })
    };

    const handleChange = () => {
        setFilesLength(getValues("files").length);
    };

    const { t } = useTranslation();

    return (
        <>
            <div className="overlay" onClick={onClickClose} />
            <div className="addNewTask">
                <div className="addNewTask__wrapper">
                    <div className="addNewTask__header">
                        <h2>{t("phrases.addANewTask")}</h2>
                        <button
                            className="addNewTask__header_exit"
                            onClick={onClickClose}
                        />
                    </div>
                    <hr className="addNewTask__divider" />
                    <form className="addNewTask__form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="addNewTask__input-wrapper">
                            <label className="addNewTask__label">{t("phrases.title")}</label>
                            <input
                                className="addNewTask__input"
                                type="text"
                                ref={register}
                                required
                                name="title"
                            />
                        </div>
                        <div className="addNewTask__input-wrapper">
                            <label className="addNewTask__label" htmlFor="tag">
                                {t("phrases.assignTo")}
                            </label>
                            <Controller
                                as={
                                    <ReactSelect
                                        styles={customStyles}
                                        placeholder={`${t('phrases.selectAssignTo')}...`}
                                        options={allUsers.map(({ userName }) => {
                                            return { value: userName, label: userName };
                                        })}
                                        defaultValue={null}
                                    />
                                }
                                name="assignTo"
                                id="assignTo"
                                required
                                control={control}
                                onChange={([selected]: any) => {
                                    return { value: selected };
                                }}
                            />
                        </div>
                        <div className="addNewTask__input-wrapper">
                            <label className="addNewTask__label" htmlFor="tag">
                Tag
                            </label>
                            <Controller
                                as={
                                    <ReactSelect
                                        options={tagOptions}
                                        styles={customStyles}
                                        placeholder={`${t('phrases.selectTag')}...`}
                                        defaultValue={null}
                                    />
                                }
                                name="tag"
                                id="tag"
                                required
                                control={control}
                                onChange={([selected]: any) => {
                                    return { value: selected };
                                }}
                            />
                        </div>
                        <div className="addNewTask__input-wrapper">
                            <label className="addNewTask__label">{t("phrases.descriptionNew")}</label>
                            <textarea
                                className="addNewTask__input addNewTask__input_textarea"
                                ref={register}
                                required
                                name="description"
                                maxLength={300}
                                value={valueDescription}
                                onChange={(e) => setValueDescription(e.target.value)}
                            />
                            <span className="addNewTask__input_textarea_valueLength">
                                {valueDescription.length + " / 300"}
                            </span>
                        </div>
                        <div className="addNewTask__input-wrapper">
                            <label className="addNewTask__label">{t("phrases.Files")}</label>
                            <div className="addNewTask__label_upload">
                                <label htmlFor="files">
                                    <div className="addNewTask__label_uploadButton">
                                        {t("phrases.uploadFiles")}
                                    </div>
                                    <input
                                        className="addNewTask__input_file"
                                        type="file"
                                        ref={register}
                                        name="files"
                                        id="files"
                                        multiple
                                        style={{ display: "none" }}
                                        onChange={handleChange}
                                    />
                                </label>
                                <progress
                                    style={{ width: "200px", height: "50px", margin: "0 10px" }}
                                    value={progressValue}
                                    max={100}
                                />
                                <span>
                                    {uploadInfo ? uploadInfo : `${t("phrases.selectedFiles")}: ${filesLength}`}
                                </span>
                            </div>
                        </div>
                        <Button
                            category={BUTTON_STYLE.Basic}
                            title="addTask"
                            type={BUTTON_TYPE.Submit}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};
