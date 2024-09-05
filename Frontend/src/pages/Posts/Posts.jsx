import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  Button,
  Spinner
} from "@material-tailwind/react";


import { useDispatch, useSelector } from "react-redux";
import { countPostsFromApi, getCategories, getPostsFromApi } from "../../redux/ApiCalls/PostsApiCalls";
import moment from "moment";
import { Link } from "react-router-dom";

function Posts() {
  const { posts,loading,postsCount,categories } = useSelector((state) => state.posts);
  const post_per_page=3;
  const pages=Math.ceil(postsCount/post_per_page);
  const generatePagination=[]
  const [pageNumber, setPageNumber] = useState(1);
  const [category, setCategory] = useState("");
  const [ActiveCategory, setActiveCategory] = useState(null);
  const [disablePaginationInput] = useState(true);
  const dispatch = useDispatch();
  


  for(let i=1;i<=pages;i++){
    generatePagination.push(i)
  }

 

  useEffect(() => {

    dispatch(getCategories())
    dispatch(countPostsFromApi());
  },[]);
  
  useEffect(() => {
    dispatch(getPostsFromApi(pageNumber));
  },[pageNumber]);



  return (
    <>
      <section className="m-6 flex min-h-fit flex-col items-center">
        <h2 className="font-manrope mb-10 text-4xl font-bold text-white">
          Latest blogs
        </h2>
      
        <div className="mb-6 flex flex-wrap items-center justify-center gap-8">
          {categories?.map((cat,i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  cat.title === "All" ? setCategory("") : setCategory(cat.title);
                  setActiveCategory(i);
                }}
                className={`min-w-[150px] cursor-pointer rounded-full p-2 px-4 text-center ${ActiveCategory == i ? "text-black] bg-white" : "bg-black text-white"}`}
              >
                {cat.title}
              </div>
            );
          })}
        </div>
        {
        posts?
        <div className="wrap flex flex-wrap justify-center gap-8 md:flex-wrap lg:flex-row">
          {loading ?<Spinner/>:
           posts?.filter((post) => {
                return category === "" ? post : post.category === category;
              })
              .map((post) => {
                return (
                  <Card
                    key={post._id}
                    className="h-[24rem] max-w-[24rem] overflow-hidden"
                  >
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="relative m-0 h-full rounded-none"
                    >
                      <img src={post?.image.url} alt="Post-Card-image" />
                      <div className="absolute top-0 m-2 rounded-full bg-blue-gray-900 px-4 py-1 text-white opacity-[0.9]">
                        {post?.category}
                      </div>
                    </CardHeader>
                    <CardBody className="h-32">
                      <Typography variant="h6" color="gray">
                        created  {moment(post.createdAt).fromNow()} 
                      </Typography>
                      <Typography variant="h5" color="blue-gray">
                        {post?.title}
                      </Typography>
                      <p className="mt-3 line-clamp-1 font-normal">
                        {post?.description}
                      </p>
                    </CardBody>
                    <CardFooter>
                      <div className="flex gap-2 items-center justify-between">
                       
                          <Tooltip content={post?.user?.username}>
                            <Avatar
                              src={post?.user?.profilePhoto.url}
                              size="sm"
                            />
                          </Tooltip>
                        <div className="">by {post?.user?.username}</div>
                        <Link to={`/Posts/${post?._id}`}>
                          <Button
                            size="sm"
                            variant="text"
                            className="flex gap-2"
                          >
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
        </div>:<div className="min-h-fit my-20 text-white text-3xl rounded bg-black p-4">no post has found</div>
        }
        <div className="mt-3 flex items-center justify-center gap-4 py-2">
          <button
            onClick={() => {
             
              setPageNumber(pageNumber - 1);              
            }}
            className="rounded-md bg-indigo-400 p-2 px-4 text-white disabled:bg-gray-600"
          disabled={pageNumber===1 && disablePaginationInput}
          >
            prev
            
          </button>
          {generatePagination.map((pag, i) => {
            return (
              <div
                key={i}
                className={`w-fit cursor-pointer rounded p-2 px-4 ${pageNumber == pag ? "border-2 border-white bg-black text-white" : "bg-white"}`}
              >
                {pag}
              </div>
            );
          })}
          <button
            onClick={() => {
              setPageNumber(pageNumber + 1);
            }}
            className="rounded-md bg-indigo-400 p-2 px-4 text-white disabled:bg-gray-600"
            disabled={pageNumber===pages && disablePaginationInput}
          >
            next
          </button>
        </div>
      </section>
    </>
  );
}

export default Posts;
