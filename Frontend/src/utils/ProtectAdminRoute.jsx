import { useSelector } from "react-redux"
import {Navigate, Outlet} from "react-router-dom"


function ProtectAdminRoute(){
   const {user}=useSelector((state)=>state.auth)

   if(!user.isAdmin){
      return <Navigate to="/Login"/>
   }
   return <Outlet/> ;
      

}



export default ProtectAdminRoute