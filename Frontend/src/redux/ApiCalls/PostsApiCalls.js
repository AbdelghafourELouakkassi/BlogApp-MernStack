import { postsActions } from "../Slices/PostsSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";



export function getPostsFromApi(pageNumber) {
  return async (dispatch) => {
    try {
      dispatch(postsActions.setLoading())
      const { data } = await request.get("/api/posts?pageNumber=" + pageNumber);
      dispatch(postsActions.getPosts(data));
      dispatch(postsActions.clearLoading())
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

export function addPostFromApi(newPost, token) {
  return async (dispatch) => {
    try {
      dispatch(postsActions.PostStillNotCreated())
      const response= await request.post("/api/posts", newPost, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message)
      dispatch(postsActions.PostIsCreated())
    } catch (error) {
      dispatch(postsActions.PostIsCreated())
      toast.error(error.response.data.message);
    }
  };
}


export function updatePost(postId,updatedPost,token){
  return async()=>{
    try {
      await request.put("/api/posts/"+postId,updatedPost,{
        headers: {
          Authorization: "Bearer " + token},
      });
      toast.success("post has been updated");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
};

export function likePost(postId,token){
  return async()=>{
    try {
      await request.put("/api/posts/like/"+postId,{},{
        headers: {
          Authorization: "Bearer " + token
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
};
export function deletePost(postId,token){
  return async()=>{
    try {
      await request.delete("/api/posts/"+postId,{
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("post has been deleted");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
};

export function countPostsFromApi() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/posts/count");

      dispatch(postsActions.setPostsCount(data.countPosts));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}



export function getCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories/");
      dispatch(postsActions.setCategories(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
}

export function createCategory(title,token) {
  return async () => {
    try {
      await request.post("/api/categories", {title}, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("new category has been created ");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

export function deleteCategory(categoryId,token) {
  return async () => {
    try {
      await request.delete("/api/categories/"+categoryId,{
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("category has been deleted ");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}



export function getComments(){
  return async(dispatch)=>{
    try {
      const {data}=await request.get("/api/comments/");
      dispatch(postsActions.setComments(data))
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
};

export function deleteComment(commentId){
  
  return async()=>{
    try {
      await request.delete("/api/comments/"+commentId,{
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      toast.success("comment has been deleted");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
};