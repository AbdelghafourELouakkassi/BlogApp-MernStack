import React, { useState } from "react";
import { deleteComment } from "../../../redux/ApiCalls/CommentsApiCalls";
import UpdateCommentModal from "./UpdateCommentModal";


function PostCommentsList({postId,comments,dispatch,user,setCommentUpdateModal,commentUpdateModal,text}) {
  const[commentToUpdate,setCommentToUpdate]=useState(null)


  function updateCommentHandler(comment){
    setCommentToUpdate(comment)
    setCommentUpdateModal(true);
  }
    
  return (
    <div className=" mt-8 min-h-screen w-full overflow-y-scroll border border-black py-4">
      {comments && comments
        ?.filter((comment) => {
          return comment.postId === postId;
        })
        .map((comment) => {
          return (
            <div
              className="flex bg-white border-2 w-[300px] lg:w-[500px] py-8  border-black rounded p-4 shadow-xl  mb-3 mx-auto flex-col items-center justify-center gap-4 "
              key={comment._id}
            >
              <h1>by {comment.username}</h1>
              <p className="text-center">{comment.text}</p>
              {user._uid===comment.user._id && (
                <div className="relative flex gap-4">
                  <button
                    onClick={()=>updateCommentHandler(comment)}
                    className="rounded bg-black px-6 py-1 text-white"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deleteComment(comment._id,user.token));
                    }}
                    className="rounded bg-red-600 px-6 py-1 text-white"
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
        <UpdateCommentModal
           commentUpdateModal={commentUpdateModal}
           dispatch={dispatch}
           text={text}
           user={user}
           setCommentUpdateModal={setCommentUpdateModal}
           commentToUpdate={commentToUpdate}
        />
    </div>
  );
}

export default PostCommentsList;
