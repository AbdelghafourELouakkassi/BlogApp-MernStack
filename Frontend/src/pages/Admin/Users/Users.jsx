import { Card, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../../redux/ApiCalls/AuthApiCalls";

export default function Users() {
  const TABLE_HEAD = ["Count", "UserName", "Email", "Action"];
  const { user,users } = useSelector((state) => state.auth);
  const dispatch=useDispatch()

 



  useEffect(() => {
    dispatch(getUsers(user.token));
  }, [users]);

  return (
    <Card className="min-h-screen w-full overflow-scroll">
      <table className="w-full overflow-scroll min-w-max table-auto text-center">
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
          {users?.map(({ _id, username, email }, index) => {
            const isLast = index === users.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={username}>
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
                    {email}
                  </Typography>
                </td>
                <td className={classes}>
                    <div className="flex items-center justify-center">
                      <Link to={`/UserProfile/${_id}`}>
                      <button className="mr-4 min-w-32 rounded bg-indigo-600 px-6 py-2 text-white">
                        View Profile
                      </button>
                      </Link>
                      <button
                        onClick={() => {
                         dispatch(deleteUser(_id,user.token,user.isAdmin));
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
