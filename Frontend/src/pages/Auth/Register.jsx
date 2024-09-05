import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { registerUser } from "../../redux/ApiCalls/AuthApiCalls";
import { Link} from "react-router-dom";



function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function formSubmit(e) {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }));
  }

  return (
    <div className="flex h-screen mt-10 justify-center ">
    <div className="bg-white h-fit px-4 py-8 rounded-md">
      <h1 className="text-black text-center text-3xl">Register</h1>
      <form
        onSubmit={formSubmit}
        className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <label className="-mb-3">Your Name</label>
          <input
            placeholder="name"
            size="lg"
            type="text"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className="border-b-2 border-black focus:outline-none "
          />
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
          Register
        </button>
        <p className="mt-4 flex flex-col text-center font-normal">
          <span className="font-medium">
            You already have an account?
            <Link to="/Login" className="ml-1 text-indigo-700">
              Login
            </Link>
          </span>
        </p>
      </form>
    </div>
  </div>
  );
}

export default Register;
