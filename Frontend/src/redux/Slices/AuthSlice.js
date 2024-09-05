import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem("userToken") ? JSON.parse(localStorage.getItem("userToken")) :null ,
  users:[],
  profile:null,
  isEmailVerified:false
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state,action) => {
       state.user=action.payload
    },
    logout: (state) => {
      state.user=null;
    },
    setUsers:(state,action)=>{
      state.users=action.payload
    },
    setProfile:(state,action)=>{
      state.profile=action.payload
    },
    setIsEmailVerified:(state)=>{
      state.isEmailVerified=true;
    }
   
  },
})


const authActions= authSlice.actions
const authReducer= authSlice.reducer

export{authActions,authReducer}