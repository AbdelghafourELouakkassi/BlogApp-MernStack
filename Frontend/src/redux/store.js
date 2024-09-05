import { configureStore } from '@reduxjs/toolkit'
import {postsReducer} from './Slices/PostsSlice'
import { authReducer } from './Slices/AuthSlice'


export const store = configureStore({
  reducer: {
    posts:postsReducer,
    auth:authReducer
  },
})