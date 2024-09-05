import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getComments, getPostsFromApi } from '../../../redux/ApiCalls/PostsApiCalls';
import { Link } from 'react-router-dom';
import { getUsers } from '../../../redux/ApiCalls/AuthApiCalls';


function Home() {
  
  const { categories,comments,posts } = useSelector((state) => state.posts);
  const { users,user } = useSelector((state) => state.auth);
  const dispatch=useDispatch()
  
  
  useEffect(()=>{
  dispatch(getCategories())
  dispatch(getComments())
  dispatch(getPostsFromApi())
  dispatch(getUsers(user.token))
  },[])
  return (
    <div className=' flex flex-col  lg:flex-row  px-20    justify-center gap-10 py-10 bg-white text-center min-h-screen w-screen'>
      
      <div className='border border-black h-48 w-68 p-7 flex flex-col gap-3 shadow-2xl rounded-lg'>
        <h1>Users</h1> 
      <span className='text-xl text-indigo-400 '>{users.length}</span>
        <div className='flex justify-center items-center gap-4'>
         <Link to="/Admin/Users" className='bg-indigo-400 py-1 px-6 rounded'>See Users</Link>
        </div>
      </div>
      <div className='border border-black h-48 w-68 p-7 flex flex-col gap-3 shadow-2xl rounded-lg'>
        <h1>Posts</h1> 
        <span className='text-xl text-indigo-400 '>{posts.length}</span> 
        <div className='flex justify-center items-center gap-4'>
         <Link to="/Admin/Posts" className='bg-indigo-400 py-1 px-6 rounded'>See Posts</Link>
        </div>
      </div>
      <div className='border border-black h-48 w-68 p-7 flex flex-col gap-3 shadow-2xl rounded-lg'>
        <h1>Comments</h1> 
        <span className='text-xl text-indigo-400 '>{comments.length}</span>
        <div className='flex justify-center items-center gap-4'>
         <Link to="/Admin/Comments" className='bg-indigo-400 py-1 px-6 rounded'>See Comments</Link>
        </div>
      </div>
      <div className='border border-black h-48 w-68 p-7 flex flex-col gap-3 shadow-2xl rounded-lg'>
        <h1>Categories</h1> 
    <span className='text-xl text-indigo-400 '>{categories.length}</span> 
        <div className='flex justify-center items-center gap-4'>
         <Link to="/Admin/Categories" className='bg-indigo-400 py-1 px-6 rounded'>See Categories</Link>
        </div>
      </div>
    </div>
  )
}

export default Home