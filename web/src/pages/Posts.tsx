import React, { useEffect } from "react";
import "../App.css";
import { usePostsQuery, useUserPostMutation } from "../generated/graphql";
interface Post {}

export const Post: React.FC<Post> = (props) => {
  return (
    <div>
      {/* <button onClick={(e) => handleClick(e)}>cleick me</button> */}
    </div>
  );
};
