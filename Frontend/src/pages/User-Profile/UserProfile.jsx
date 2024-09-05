import React, { useState } from "react";
import { Link} from "react-router-dom";
import request from "../../utils/request";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import UpdateUserProfile from "./UpdateUserProfile";
import { deletePost } from "../../redux/ApiCalls/PostsApiCalls";
import Swal from 'sweetalert2'
import { deleteUser} from "../../redux/ApiCalls/AuthApiCalls";
import { toast } from "react-toastify";






function UserProfile() {
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { user,profile } = useSelector((state) => state.auth);
  const dispatch=useDispatch();



  const changeProfilePhoto = async () => {
    const formData = new FormData();
    formData.append("image", profileImage);
    try {
      const resposne=await request.post("/api/users/profile/profile-upload-photo", formData, {
        headers: {
          Authorization: "Bearer " + user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(resposne.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteUserProfile=()=>{
    Swal.fire({
      title: "Do you want to delete your profile?",
      showCancelButton: true,
      confirmButtonText: "delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(user._uid,user.token,user.isAdmin))
      }
    });

  }

  const deleteUserPost=(post)=>{
    Swal.fire({
      title: "Do you want to delete your post?",
      showCancelButton: true,
      confirmButtonText: "delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(post?._id,user.token))
      }
    });

  }

  

  return (
    <div className="min-h-screen w-full flex flex-col  items-center  overflow-y-scroll bg-white px-40 py-6 text-white">
      <div className="flex min-h-[300px] min-w-[400px] flex-col items-center rounded bg-gray-800 p-4 ">
        <h1 className="my-4">{profile?.username}</h1>
        <img
          src={profile?.profilePhoto.url}
          className="h-40 w-40 rounded-full my-2"
          alt="userProfilePhoto"
        />
        {user._uid === profile?.id ? (
          <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row item-center  my-8">
            <input
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="mt-2"
            />
            <button
              onClick={() => {
                changeProfilePhoto();
              }}
              className="rounded bg-indigo-600 px-6  py-2"
            >
              Upload New Profile Photo
            </button>
            
            <button
              onClick={() => {
                setUpdateProfileModal(true)
              }}
              className="rounded bg-pink-600 px-6 py-2 mx-4 "
            >
              Update Your Profile
            </button>
            <button
              onClick={() => {
                deleteUserProfile()
              }}
              className="rounded bg-pink-600 px-6 py-2 mx-4"
            >
              Delete Your Profile
            </button>
            
          </div>
        ) : null}
      </div>
      {updateProfileModal &&<UpdateUserProfile setUpdateProfileModal={setUpdateProfileModal} profile={profile}/>
      }
      <h1 className="mt-5 text-3xl text-black text-center">Posts by this user</h1>
      <div className="wrap mt-10 flex justify-center  h-screen flex-wrap gap-8 md:flex-wrap lg:flex-row">
        {profile?.posts?.map((post) => {
          return (
            <Card
              key={post._id}
              className="h-[21rem] max-w-[22rem] overflow-hidden"
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="relative m-0 h-full rounded-none"
              >
                <img src={post.image.url} alt="Post-Card-image" />
                <div className="absolute top-0 m-2 rounded-full bg-blue-gray-900 px-4 py-1 text-white opacity-[0.9]">
                  {post.category}
                </div>
              </CardHeader>
              <CardBody className="h-28">
                <Typography variant="h6" color="gray">
                  created  {moment(post.createdAt).fromNow()} 
                  </Typography>
                <Typography variant="h4" color="blue-gray">
                  {post.title}
                </Typography>
                <p className="mt-3 line-clamp-1 font-normal">
                  {post.description}
                </p>
              </CardBody>
              <CardFooter>
                <div className="flex items-center justify-around">
                  {user._uid === post.user ? (
                    <button
                    onClick={()=>{deleteUserPost(post)
                    }
                    }
                    className="rounded-md bg-pink-700 px-6 py-2 text-white">
                      delete
                    </button>
                  ) : null}
                  <Link to={`/Posts/${post._id}`}>
                    <Button size="sm" variant="text" className="flex gap-2">
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default UserProfile;
