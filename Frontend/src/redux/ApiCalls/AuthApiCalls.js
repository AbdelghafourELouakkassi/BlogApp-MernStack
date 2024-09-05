import request from "../../utils/request";
import { authActions } from "../Slices/AuthSlice";
import { toast } from "react-toastify";


export function registerUser(newUser) {
  return async () => {
    try {
      const { data } = await request.post("/api/auth/register", newUser);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userToken", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userToken");
  };
}

export function getUserProfile(id){
  return async(dispatch)=>{

    try {
      const { data } = await request.get("/api/users/profile/" + id);
      dispatch(authActions.setProfile(data))
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
};


export function getUsers(token) {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/users/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(authActions.setUsers(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function deleteUser(userId,token,isAdmin) {
  return async () => {
    try {
      await request.delete("/api/users/profile/"+ userId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("user has been deleted");
      if(!isAdmin){
        localStorage.removeItem("userToken");
        location.replace("http://localhost:5173/")
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function updateUser(userId,token,updatedUser) {
  return async (dispatch) => {
    try {
      await request.put("/api/users/profile/"+ userId,updatedUser,{
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      
      toast.success("user has been updated");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
