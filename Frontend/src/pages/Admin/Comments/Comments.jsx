import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import request from "../../../utils/request";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getComments } from "../../../redux/ApiCalls/PostsApiCalls";



function Comments() {
  const TABLE_HEAD = ["Count", "Author", "Comment", "Action"];
  const dipatch=useDispatch()
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.posts);




 

  useEffect(()=>{
    dipatch(getComments())
  },[comments])


  return (
    <Card className="h-screen w-full overflow-scroll">
    <table className="w-full min-w-max table-auto text-center">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {comments && comments?.map(({ _id, username, text,postId }, index) => {
          const isLast = index === comments.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={_id}>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {index + 1}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {username}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {text}
                </Typography>
              </td>
              <td className={classes}>
              
                  <div className="flex items-center justify-center">
                    <Link to={`/posts/${postId}`}>
                    <button className="mr-4 w-32 rounded bg-indigo-600 px-6 py-2 text-white">
                      View Post
                    </button>
                    </Link>
                    <button
                      onClick={() => {
                        deleteComment(_id);
                      }}
                      className="mr-4 w-32 rounded bg-red-700 px-6 py-2 text-white"
                    >
                      Delete
                    </button>
                  </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </Card>
  )
}

export default Comments