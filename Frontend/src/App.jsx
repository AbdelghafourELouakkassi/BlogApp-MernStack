import React from 'react'
import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import Home from './pages/Home/Home'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import Posts from './pages/Posts/Posts'
import Header from './components/Header'
import Footer from './components/Footer'
import AdminDashboard from './pages/Admin/AdminDashboard'
import Login from './pages/Auth/Login'
import UserProfile from './pages/User-Profile/UserProfile'
import Register from './pages/Auth/Register'
import AddPostForm from './pages/Posts/Add-Post/AddPostForm'
import SinglePost from './pages/Posts/Single-Post/SinglePost'
import AdminCategories from './pages/Admin/Categories/Categories'
import AdminPosts from './pages/Admin/Posts/Posts'
import Admin_Home_Page from './pages/Admin/Home/Home'
import AdminComments from './pages/Admin/Comments/Comments'
import AdminUsers from './pages/Admin/Users/Users'
import ProtectedRoute from './utils/ProtectedRoute'
import ProtectAdminRoute from './utils/ProtectAdminRoute'
import { useSelector } from 'react-redux'





export default function App() {

  const {user}=useSelector(state=>state.auth)
  return (
   <>
    <BrowserRouter>
      <Header/> 
        <Routes>
         <Route path='/' element={<Home/>} />
         <Route element={<ProtectAdminRoute/>}>
            <Route path='Admin' element={<AdminDashboard/>}>
                <Route path='Home' element={<Admin_Home_Page/>} />                      
                <Route path='Users' element={<AdminUsers/>} />                      
                <Route path='Posts' element={<AdminPosts/>} />                      
                <Route path='Categories' element={<AdminCategories/>} />                      
                <Route path='Comments' element={<AdminComments/>} />                      
            </Route>
          </Route>   
          <Route  element={<ProtectedRoute/>}>
            <Route path='Posts'>
                <Route index element={<Posts/>}/>
                <Route path='AddPost' element={<AddPostForm/>} />
                <Route path=':id' element={<SinglePost/>} />
            </Route> 
            <Route path='/UserProfile' element={<UserProfile/>} />
         </Route>
         
          <Route path='Register' element={<Register/>} />
          <Route path='Login' element={!user?<Login/>:<Navigate to="/"/>} />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      <Footer/>
    </BrowserRouter>
   </>

  )
}
