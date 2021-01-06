import React from "react";
import { followers } from "./followersItems";
import "./followers.scss";

export const Followers = () => {
  return (
    <div className="followers">
      {Boolean(followers.length) &&
        followers.map((follower) => (
          <img className="followers__img" src={follower} alt={follower} />
        ))}
    </div>
  );
};
