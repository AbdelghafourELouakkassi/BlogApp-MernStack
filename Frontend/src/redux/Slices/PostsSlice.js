import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts:[],
  postsCount:null,
  categories:[],
  comments:[],
  loading:false,
  isPostCreated:true,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state,action) => {
       state.posts=action.payload
    },
    setPostsCount(state,action){
      state.postsCount=action.payload
    },
    setCategories(state,action){
      state.categories=action.payload
    },
    setComments(state,action){
      state.comments=action.payload
    },
    setLoading(state){
      state.loading=true;
    },
    clearLoading(state){
      state.loading=false;
    },
    PostStillNotCreated(state){
      state.isPostCreated=false
    },
    PostIsCreated(state){
      state.isPostCreated=true;
    },
  
  },
})


const postsActions= postsSlice.actions
const postsReducer= postsSlice.reducer

export{postsActions,postsReducer}