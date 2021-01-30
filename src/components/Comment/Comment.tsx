import React from "react";

import { commentType } from "components/Tasks/taskItems";

import "./comment.scss";

interface CommentProps {
  comments: commentType[];
}

export const Comment = ({ comments }: CommentProps) => {
  return (
    <div>
      {comments.map(({ author, vacancy, createDate, text, id, photo }) => {
        return (
          <div className="comment" key={id}>
            <img className="comment__img" alt="avatar" src={photo} />
            <div className="comment__header">
              <div className="comment__header_container">
                <span className="comment__header_author">{author},</span>
                <span className="comment__header_vacancy">{vacancy}</span>
              </div>
              <span className="comment__header_date">{createDate}</span>
            </div>
            <span className="comment__text">{text}</span>
          </div>
        );
      })}
    </div>
  );
};
