import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePost,
  getPostsFromApi,
} from "../../../redux/ApiCalls/PostsApiCalls";

export default function Posts() {
  const TABLE_HEAD = ["Count", "title", "author", "Action"];
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { user:loggedUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPostsFromApi());
  }, [posts]);

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
          {posts?.map(({ _id, title, user }, index) => {
            const isLast = index === posts.length - 1;
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
                    {title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {user.username}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="flex items-center justify-center">
                    <Link to={`/posts/${_id}`}>
                      <button className="mr-4 w-32 rounded bg-indigo-600 px-6 py-2 text-white">
                        View Post
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(deletePost(_id, loggedUser.token));
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
  );
}
