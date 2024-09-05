import React, { useEffect, useLayoutEffect, useState } from "react";
import { updateComment } from "../../../redux/ApiCalls/CommentsApiCalls";

function UpdateCommentModal({ commentUpdateModal,setCommentUpdateModal, dispatch, user,commentToUpdate}) {
  const [text,setText] = useState(commentToUpdate?.text);


  return (
    <div
      className={`${commentUpdateModal ? "bg-black/[0.3] fixed top-0 left-0 flex justify-center items-center z-[999] w-full  h-full " : "hidden"}`}
    >
      <form className="relative bg-white shadow-4xl min-w-[350px] px-6 lg:min-w-[500px] flex flex-col py-14 rounded-md gap-6 text-center">
        <span className="absolute right-5 text-2xl top-3 text-black cursor-pointer" onClick={()=>{
          setCommentUpdateModal(!commentUpdateModal)
        }}>X</span>
    
        <textarea

          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="text"
          className="h-10 border border-black text-black"
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            dispatch(updateComment(commentToUpdate._id,text, user.token));
            setCommentUpdateModal(false)
          }}
          className="rounded bg-indigo-700 px-6 py-1 text-white"
        >
          update
        </button>
      </form>
    </div>
  );
}

export default UpdateCommentModal;
