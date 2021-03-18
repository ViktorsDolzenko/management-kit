import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { auth, db, storage, timestamp } from "Service/firebase";
import { useForm } from "react-hook-form";

import { Button, BUTTON_STYLE } from "components/Button";
import photo_1 from "components/Tasks/images/photo-1.png";
import { TASK_TYPE } from "components/Tasks/taskItems";
import { BUTTON_TYPE } from "components/Button/buttonProps";
import { getTasks, StorageContext } from "context/storage";
import { updateTasks } from "context/actions";
import { getTaskNewId } from "utils";

import "./addNewTask.scss";

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
  const { register, handleSubmit } = useForm();
  const { state, dispatch } = useContext(StorageContext);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, [currentUser]);

  const uploadFiles = async (
    files: File[] | undefined
  ): Promise<uploadedFilesResponse[]> => {
    let filesLinks: uploadedFilesResponse[] = [];
    if (!files) return [];
    for (const file of files) {
      if (file.size > Math.pow(1024, 2) * 5) {
        const fileSizeError = (file.size / Math.pow(1024, 2)).toFixed(1);
        alert(`Your file size is: ${fileSizeError}MB maximum size is 5 MB`);
      }

      const storageRef = storage.ref();
      const uploadTask = storageRef
        .child(`users/${currentUser.uid}/files/${file.name}`)
        .put(file);

      uploadTask.on("state_changed", (snapshot: any) => {
        let percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressValue(percentage);
      });

      const fileUrl = await uploadTask.snapshot.ref.getDownloadURL();
      const url = new URL(fileUrl);
      const preparedUrl = `${url.origin}${url.pathname}`;

      filesLinks.push({
        name: file.name,
        size: file.size,
        type: file.type,
        url: preparedUrl,
      });
    }
    return filesLinks;
  };

  const onSubmit = async (data: any) => {
    const key = getTaskNewId(state.tasks);
    const filesUrls = await uploadFiles(data.files);
    await db
      .collection("tasks-collection")
      .doc("tasks")
      .update({
        [key]: {
          done: false,
          image: photo_1,
          title: data.title,
          tag: data.tag,
          date: moment().format(" MMMM Do"),
          assign: data.assignTo,
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
              fileTag: data.tag,
              taskID: key,
            };
          }),
        },
      });
    const tasks = await getTasks();
    dispatch(updateTasks(tasks));
    onClickClose();
  };

  return (
    <div className="addNewTask">
      <div className="addNewTask__wrapper">
        <div className="addNewTask__header">
          <h2>Add a New Task</h2>
          <button className="addNewTask__header_exit" onClick={onClickClose} />
        </div>
        <hr className="addNewTask__divider" />
        <form className="addNewTask__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="addNewTask__input-wrapper">
            <label className="addNewTask__label">Title</label>
            <input
              className="addNewTask__input"
              type="text"
              ref={register}
              required={true}
              name="title"
            />
          </div>
          <div className="addNewTask__input-wrapper">
            <label className="addNewTask__label">Description</label>
            <input
              className="addNewTask__input"
              type="text"
              ref={register}
              required={true}
              name="description"
            />
          </div>
          <div className="addNewTask__input-wrapper">
            <label className="addNewTask__label">Assign To</label>
            <input
              className="addNewTask__input"
              type="text"
              ref={register}
              required={true}
              name="assignTo"
            />
          </div>
          <div className="addNewTask__input-wrapper">
            <label className="addNewTask__label" htmlFor="tag">
              Tag
            </label>
            <select
              className="addNewTask__input"
              name="tag"
              id="tag"
              ref={register}
              required={true}
            >
              <option value="development">Development</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
            </select>
          </div>
          <div className="addNewTask__input-wrapper">
            <label className="addNewTask__label">File</label>
            <input
              className="addNewTask__input_file"
              type="file"
              ref={register}
              name="files"
              multiple
            />
            <progress value={progressValue} max={100} />
          </div>
          <Button
            category={BUTTON_STYLE.basic}
            title="Add Task"
            type={BUTTON_TYPE.submit}
          />
        </form>
      </div>
    </div>
  );
};
