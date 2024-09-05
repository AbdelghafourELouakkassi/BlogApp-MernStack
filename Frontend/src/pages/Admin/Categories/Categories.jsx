import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../../redux/ApiCalls/PostsApiCalls";

function Categories() {
  const TABLE_HEAD = ["Count", "Category", "Action"];
  const [newCategory, setNewCategory] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [categories]);

  return (
    <Card className="h-screen w-full overflow-scroll">
      <div className="m-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(createCategory(newCategory, user.token));
          }}
        >
          <input
            className="mr-4 rounded border border-black p-1 text-center"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
            }}
            type="text"
            placeholder="name of new category"
          />
          <button className="rounded bg-black px-6 py-1 text-white">
            create
          </button>
        </form>
      </div>
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
          {categories?.map(({ _id, title }, index) => {
            const isLast = index === categories.length - 1;
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
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        dispatch(deleteCategory(_id, user.token));
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

export default Categories;
