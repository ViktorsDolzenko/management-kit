import React from "react";
import { followers } from "./followersItems";

export const Followers = () => {
  return (
    <div>
      {Boolean(followers.length) &&
        followers.map((follower) => <img src={follower} alt={follower} />)}
    </div>
  );
};
