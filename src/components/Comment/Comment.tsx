import React from "react";
import { commentType } from "components/Tasks/taskItems";

interface CommentProps {
  comments: commentType[];
}

export const Comment = ({ comments }: CommentProps) => {
  return (
    <div>
      {comments.map(({ author, vacancy, createDate, text }) => {
        return (
          <div className="comment">
            <img className="comment__img" alt="avatar" />
            <div className="comment__header">
              <span className="comment__header_author">{author}</span>
              <span className="comment__header_vacancy">{vacancy}</span>
              <span className="comment__header_date">{createDate}</span>
            </div>
            <span className="comment__text">{text}</span>
          </div>
        );
      })}
    </div>
  );
};
