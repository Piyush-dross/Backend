import {createBrowserRouter} from "react-router"
import Register from "../Features/auth/pages/Register"
import Login from "../Features/auth/pages/Login"
import Protected from "./auth/components/Protected"
import Home from "../Features/Homes/pages/Home"

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Protected><Home/></Protected>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/login',
        element:<Login/>
    }


])