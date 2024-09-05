import { postsActions } from "../Slices/PostsSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";



export function getComments(){
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/comments/");
      dispatch(postsActions.setComments(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }};


export function addComment(postId,text,token){
    return async()=>{
        try {
         const response= await request.post("/api/comments/", {postId,text}, {
            headers: {
              Authorization: "Bearer " +token,
            },
          });
          toast.success(response.data.message)

        } catch (error) {
          toast.error(error.response.data.message);
        }

    }
  };

  export function deleteComment(commentId,token){
    return async()=>{
    try {
      const response=await request.delete("/api/comments/"+commentId,{
        headers: {
          Authorization: "Bearer " +token,
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  };  


  export function updateComment(commentId,text,token){
    return async()=>{
    try {
      await request.put("/api/comments/"+commentId,{text},{
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("comment has been updated");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  };
