import React, { useEffect, useState } from "react";
import no_image_available from "../../../assets/No_Image_Available.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addPostFromApi, getCategories } from "../../../redux/ApiCalls/PostsApiCalls";

import 'react-toastify/dist/ReactToastify.css';




function AddPostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { categories,isPostCreated } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    dispatch(addPostFromApi(formData, user.token));
  }

  useEffect(()=>{
    dispatch(getCategories())
  },[])
  return (
    <div className="min-h-screen flex justify-center py-4">
      <main className="bg-white w-fit flex flex-col items-center py-6 px-10 rounded-md">
      <h1>Add New Post</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center justify-center gap-4 px-8 py-4 "
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="border border-black p-1 text-center w-full "
          placeholder="title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          type="text"
          className="w-full border border-black p-1 text-center"
          placeholder="description"
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
        <input onChange={(e) => setImage(e.target.files[0])} type="file"  />
        <img
          src={!image ? no_image_available : URL.createObjectURL(image)}
          className="w-full h-56"
        />

        <button className="bg-black px-6 py-1 text-white w-full">
          {isPostCreated?"create":"creating...."}
          </button>
      </form>
      </main>
    </div>
  );
}

export default AddPostForm;
