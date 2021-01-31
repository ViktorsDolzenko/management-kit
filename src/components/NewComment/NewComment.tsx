import React from "react";
import "./newComment.scss";
import { useForm } from "react-hook-form";
import { commentType } from "components/Tasks/taskItems";
import { getNewId } from "utils";
import moment from "moment";

interface newCommentProps {
  addComment: (comment: commentType, taskId: number) => void;
  taskId: number;
  comments: commentType[];
  username: string;
}

export const NewComment = ({
  addComment,
  taskId,
  comments,
  username,
}: newCommentProps) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    addComment(
      {
        id: getNewId(comments),
        author: username,
        createDate: moment().format(" MMMM Do [at] HH:mm"),
        text: data.text,
        vacancy: "Developer",
        photo: "https://via.placeholder.com/48",
      },
      taskId
    );
    reset();
  };

  return (
    <div className="new-comment">
      <img
        src="https://via.placeholder.com/48"
        alt="profile-avatar"
        className="new-comment__avatar"
      />
      <form className="new-comment__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="new-comment__input"
          placeholder="Add a comment…"
          ref={register}
          required={true}
          name="text"
        />
      </form>
    </div>
  );
};
