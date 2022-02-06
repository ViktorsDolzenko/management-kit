import React from "react";
import { Link } from "react-scroll";

import { taskItemsType } from "components/Tasks/taskItems";
import { CheckBox } from "components/CheckBox";
import { Tag } from "components/Tag";

import "./taskList.scss";
import { tagType } from "../../utils";
import { db } from "../../Service/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface tasksListItemsType {
  items: taskItemsType[];
  onTaskSelect: (taskId: number) => void;
  onDoneChecked: (taskId: number, checked: boolean) => void;
}


export const TasksList = ({
    items,
    onTaskSelect,
    onDoneChecked
}: tasksListItemsType) => {
    // get user collection
    const getUser = db.collection("users");
    // @ts-ignore
    const [values] = useCollectionData(getUser, { idField: "id" });

    // get user avatars
    const getAvatar = (userName: string) => {
        const foundedUser = values?.find((item) => item.userName === userName);
        return foundedUser?.avatarUrl ? `${foundedUser?.avatarUrl}?alt=media` : 'https://via.placeholder.com/50';
    };
    return (
        <>
            {items.map((item) => {
                const taskId = item.id.toString();
                return (
                    <div className="taskList" key={item.id}>
                        <div className="taskList__container">
                            <CheckBox
                                id={taskId}
                                isChecked={item.done}
                                onChange={() => onDoneChecked(item.id, item.done)}
                            />
                            <Link
                                to="taskDescriptionTitle"
                                spy
                                smooth
                                offset={-70}
                                duration={500}
                            >
                                <div onClick={() => onTaskSelect(item.id)}>
                                    <span className="taskList__text">{item.title}</span>
                                    <div className="taskList__tag">
                                        <img
                                            // @ts-ignore
                                            src={getAvatar(item.assign)}
                                            alt={item.image}
                                            className="taskList__tag_img"
                                        />
                                        <Tag type={tagType(item.tag)} title={item.tag} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
