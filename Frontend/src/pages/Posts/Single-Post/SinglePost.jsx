import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../../utils/request";
import PostAddComment from "./PostAddComment";
import { useDispatch, useSelector } from "react-redux";
import PostCommentsList from "./PostCommentsList";
import { getComments } from "../../../redux/ApiCalls/CommentsApiCalls";
import UpdatePostModal from "./UpdatePostModal";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { deletePost, likePost } from "../../../redux/ApiCalls/PostsApiCalls";
import { ToastContainer } from "react-toastify";


function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.posts);
  const [text, setText] = useState("");
  const [commentUpdateModal, setCommentUpdateModal] = useState(false);
  const [postUpdateModal, setPostUpdateModal] = useState(false);
  const dispatch = useDispatch();

  const getPost = async () => {
    try {
      const { data } = await request.get("/api/posts/" + id);
      setPost(data.post);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getPost();
  }, [post]);

  useEffect(() => {
    dispatch(getComments());
  }, [comments]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-white text-center text-black">
      <img
        src={post?.image.url}
        className="mx-auto h-[auto] w-[700px] p-10"
        alt="blog Post Image"
      />
      <div className="mb-10 flex flex-wrap items-center justify-around gap-10">
        <h1>Author : {post?.user.username}</h1>
        {user?._uid === post?.user._id && (
          <div className="flex gap-4">
            <button
              onClick={() => setPostUpdateModal(true)}
              className="rounded bg-green-400 px-6 py-1 text-white"
            >
              edit
            </button>
            <button
              onClick={() => dispatch(deletePost(post?._id, user.token))}
              className="rounded bg-red-600 px-6 py-1 text-white"
            >
              delete
            </button>
          </div>
        )}
      </div>
      <h1 className="text-3xl">{post?.title}</h1>
      <p className="m-10  px-20 w-full text-xl">
        {
          post?.description
        }
      </p>
      <div className="mr-[200px] flex items-center justify-start gap-2 lg:mr-[450px]">
        {post?.likes.find((like) => {
          return like.toString() === user._uid;
        }) ? (
          <AiFillLike
            onClick={() => {
              dispatch(likePost(post?._id, user.token));
            }}
            size={40}
            className="mb-2"
          />
        ) : (
          <AiOutlineLike
            onClick={() => {
              dispatch(likePost(post?._id, user.token));
            }}
            size={40}
            className="mb-2"
          />
        )}

        <div className="text-2xl">{post?.likes.length}</div>
      </div>

      <PostAddComment
        postId={post?._id}
        dispatch={dispatch}
        setText={setText}
        text={text}
        user={user}
      />

      <PostCommentsList
        postId={post?._id}
        dispatch={dispatch}
        comments={comments}
        setCommentUpdateModal={setCommentUpdateModal}
        commentUpdateModal={commentUpdateModal}
        user={user}
      />
      {postUpdateModal && (
        <UpdatePostModal
          post={post}
          postUpdateModal={postUpdateModal}
          setPostUpdateModal={setPostUpdateModal}
        />
      )}
    </div>
  );
}

export default SinglePost;
