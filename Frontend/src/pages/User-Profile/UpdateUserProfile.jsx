import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/ApiCalls/AuthApiCalls'

function UpdateUserProfile({setUpdateProfileModal,profile}) {
  const { user } = useSelector((state) => state.auth);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  
  function handleUpdateProfile(e){
    e.preventDefault()
    dispatch(updateUser(profile._id,user.token,{username,password}))
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center text-black bg-white/[0.3] z-[999]'>
        <form onSubmit={handleUpdateProfile} className='relative bg-white rounded-md shadow-2xl shadow-black flex flex-col justify-center p-4 gap-4  w-[500px] min-h-[300px]'>
            <span onClick={()=>setUpdateProfileModal(false)} className='text-black cursor-pointer text-3xl absolute top-4 right-4 '>x</span>
            <h1 className='text-black mb-10 text-center text-2xl'>update profile</h1>
            <input placeholder='new Username' onChange={(e)=>setUserName(e.target.value)} type="text" className='border border-black rounded p-1 ' />
            <input placeholder='new Password' onChange={(e)=>setPassword(e.target.value)} type="password"  className='border border-black rounded p-1' />
            <button className='bg-black text-white py-1 px-6'>update</button>
        </form>
    </div>
  )
}

export default UpdateUserProfile