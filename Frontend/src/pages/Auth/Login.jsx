import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/ApiCalls/AuthApiCalls";
import { Link} from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function formSubmit(e) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }


  return (
    <div className=" flex h-screen mt-10 justify-center ">
      <div className="bg-white h-fit px-4 py-8 rounded-md">
        <h1 className="text-black text-center text-3xl">Login</h1>
        <form
          onSubmit={formSubmit}
          className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <label className="-mb-3">Your Email</label>
            <input
              placeholder="email"
              size="lg"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border-b-2 border-black focus:outline-none "
            />
            <label className="-mb-3">Password</label>
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-b-2 border-black  focus:outline-none"

            />
          </div>
          <button className="mt-6 bg-black outline-white w-full text-center text-white rounded p-2">
            Login
          </button>
          <p className="mt-4 flex flex-col text-center font-normal">
            <span className="font-medium">
              AYou are not have an account?
              <Link to="/Register" className="ml-1 text-indigo-700">
                Register
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
