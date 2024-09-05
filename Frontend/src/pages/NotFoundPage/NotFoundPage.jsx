import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col gap-6 items-center justify-center bg-white text-6xl">
      <span className="text-red-600 ">404</span>
      <h1>Not Found</h1>
      <Link to="/"><span className="text-2xl bg-black py-4 px-6 text-white rounded" >Go Home</span></Link>
    </div>
  );
}

export default NotFoundPage;
