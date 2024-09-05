import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logoutUser } from "../redux/ApiCalls/AuthApiCalls";
import { ToastContainer } from "react-toastify";


function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user,profile } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  useEffect(() => {
    dispatch(getUserProfile(user?._uid))
  }, [profile]);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col items-center justify-center gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-10">
      <Typography as="li" color="blue-gray" className="p-1 text-xl font-normal">
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        color="blue-gray"
        className="flex items-center p-1 text-xl font-normal"
      >
        <Link to="/Posts/AddPost" className="flex items-center">
          <IoCreateOutline className="mb-2" size={36} />
          Add Post
        </Link>
      </Typography>
      {user?.isAdmin && (
        <Typography
          as="li"
          color="blue-gray"
          className="p-1 text-xl font-normal"
        >
          <Link to="/Admin" className="flex items-center">
            Dashboard
          </Link>
        </Typography>
      )}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-fit max-w-full rounded-none px-4 py-2 shadow-none lg:px-8 lg:py-4">
      <ToastContainer/>
      <div className="flex items-center justify-around text-blue-gray-900">
        <Typography as="a" href="#" className="cursor-pointer text-3xl">
          .Blog
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <div className="group relative">
              <div className="flex items-center gap-2">
                <span className="text-xl capitalize">{profile?.username}</span>
                <Tooltip content={profile?.username}>
                  <Avatar src={profile?.profilePhoto.url} size="lg" />
                </Tooltip>
              </div>
              <div className="absolute -right-5 top-4 z-[1000] hidden flex-col gap-6 rounded-md bg-white p-12 group-hover:flex">
                <Link to={`/UserProfile`} className="text-black">
                  Profile
                </Link>
                <Link
                  onClick={() => {
                    dispatch(logoutUser());
                  }}
                  className="text-black"
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/Login" className="hidden lg:inline-block">
                <Button className="bg-white text-black shadow-none hover:shadow-none">
                  Log In
                </Button>
              </Link>
              <Link to="/Register" className="hidden lg:inline-block">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        {navList}
        {user ? (
          <div className="group mb-4 flex justify-center">
            <Tooltip content={profile?.username}>
              <Avatar
                src={profile?.profilePhoto.url}
                className="rounded-full"
                size="lg"
              />
            </Tooltip>
            <div className="absolute top-52 z-[1000] hidden flex-col gap-6 rounded-md bg-white p-12 group-hover:flex">
              <Link to={`/UserProfile`} className="text-black">
                Profile
              </Link>
              <Link
                onClick={() => {
                  dispatch(logoutUser());
                }}
                className="text-black"
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/Login">
              <Button>Log In</Button>
            </Link>
            <Link to="/Register">
              <Button>Register</Button>
            </Link>
          </div>
        )}
      </Collapse>
    </Navbar>
  );
}

export default Header;
