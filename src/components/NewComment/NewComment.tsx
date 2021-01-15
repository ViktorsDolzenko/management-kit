import React from "react";
import "./newComment.scss";

export const NewComment = () => {
  return (
    <div className="new-comment">
      <img
        src="https://via.placeholder.com/48"
        alt="profile-avatar"
        className="new-comment__avatar"
      />
      <form className="new-comment__form">
        <input className="new-comment__input" placeholder="Add a comment…" />
      </form>
    </div>
  );
};
