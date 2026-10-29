import { createBrowserRouter } from "react-router";
import { Home } from "./page/home";
import { Car } from "./page/car";
import { Login } from "./page/login";
import { Register } from "./page/register";
import { Dashboard } from "./page/dashboard";
import { Layout } from "./components/Layout";
import { New } from "./page/dashboard/new";
import { Private } from "./routes/Private";




const router = createBrowserRouter ([
  {

    element:  <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/car/:id",
        element: <Car/>

      },
      {
        path: "/dashboard",
        element: <Private><Dashboard /></Private> 

      },
     
      {
        path: "/dashboard/new",
        element: <Private><New/></Private>
      }



    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register />
  },
])

export {router}