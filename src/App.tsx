import { createBrowserRouter } from "react-router";
import { Home } from "./page/home";
import { Car } from "./page/car";
import { Login } from "./page/login";
import { Register } from "./page/register";
import { Dashboard } from "./page/dashboard";
import { Layout } from "./components/Layout";
import { New } from "./page/dashboard/new";




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
        element: <Dashboard/>

      },
     
      {
        path: "/dashboard/new",
        element: <New/>
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