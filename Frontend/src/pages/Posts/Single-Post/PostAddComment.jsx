import React from "react";
import { addComment } from "../../../redux/ApiCalls/CommentsApiCalls";

function PostAddComment({ postId ,dispatch,user,text,setText}) {
  return (
    <div>
      <form className="flex flex-col lg:flex-row items-center gap-4">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="type a comment.."
          className="w-96 border-2 border-black p-4"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(addComment(postId,text,user.token));
          }}
          className="h-10 rounded bg-green-400 px-6"
        >
          Comment
        </button>
      </form>
     </div>
  );
}

export default PostAddComment;
