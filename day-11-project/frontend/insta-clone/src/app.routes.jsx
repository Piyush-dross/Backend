import { createBrowserRouter} from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Feed from "./features/auth/post/pages/feed"
import Createpost from "./features/auth/post/pages/Createpost"
export const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:"/",
        element:<Feed/>
    },
    {
        path:"/createpost",
        element:<Createpost/>
    }

])