import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, updatePost } from "../../../redux/ApiCalls/PostsApiCalls";
import no_image_available from "../../../assets/No_Image_Available.jpg";


function UpdatePostModal({ post, setPostUpdateModal }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { categories } = useSelector((state) => state.posts);

  function handleFormSubmit(e) {
    e.preventDefault();
    const updatedPost={
      title,description,category
    }
    dispatch(updatePost(post._id,updatedPost, user.token));
  }
  useEffect(()=>{
    dispatch(getCategories())
  },[])
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black/[0.3] p-10">
      <form
        onSubmit={handleFormSubmit}
        className="relative flex min-h-[400px] w-[500px] flex-col items-center justify-center gap-4 rounded bg-white p-10 shadow-2xl shadow-black"
      >
        <span
          onClick={() => setPostUpdateModal(false)}
          className="absolute right-6 top-3 cursor-pointer text-4xl"
        >
          x
        </span>
        <h1 className="text-3xl text-black">update post</h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="w-full rounded border-2 border-black p-1 text-center"
          placeholder="new title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          type="text"
          className="w-full rounded border-2 border-black p-1 text-center"
          placeholder=" new description"
        />
         <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-black p-1 w-full"
        >
          <option disabled value="">
            select category
          </option>
          {
            categories?.map((cat)=>{
              return (
                <option key={cat._id} value={cat.title}>{cat.title}</option>
              )
            })
          }
        </select>
        <button className="w-1/2 rounded-sm bg-black py-1 text-white">
          update
        </button>
      </form>
    </div>
  );
}

export default UpdatePostModal;
