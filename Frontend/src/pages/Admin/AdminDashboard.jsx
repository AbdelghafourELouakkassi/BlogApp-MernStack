import React from "react";
import { Outlet, Link} from "react-router-dom";
function AdminDashboard() {


  return (
    <div className=" flex flex-col lg:flex-row min-h-screen ">
      <div className="flex  flex-col items-center gap-5 bg-black p-6  text-white ">
        <h1 className="text-center rounded-sm  p-3 text-2xl">
          Admin Dashboard
        </h1>
        <Link to={"/Admin/Home"} className="bg-indigo-500 w-fit px-6 py-2 rounded min-w-[150px] text-center">Home</Link>
        <Link to={"/Admin/Users"} className="bg-indigo-500 w-fit px-6 py-2 rounded min-w-[150px] text-center">Users</Link>
        <Link to={"/Admin/Comments"} className="bg-indigo-500 w-fit px-6 py-2 rounded  min-w-[150px] text-center">Comments</Link>
        <Link to={"/Admin/Posts"} className="bg-indigo-500 w-fit px-6 py-2 rounded  min-w-[150px] text-center">Posts</Link>
        <Link to={"/Admin/Categories"} className="bg-indigo-500 w-fit px-6 py-2 rounded  min-w-[150px] text-center">Categories</Link>
        
      </div>
        
      <Outlet />
    
    </div>
  );
}

export default AdminDashboard;
