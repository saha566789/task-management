import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayouts from './Layouts/MainLayouts';
import Home from './Pages/Home/Home';
import AuthProvider from './Hooks/AuthProvider';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Layouts/Dashboard';
import AddTask from './Dashboard/AddTask';
import TaskList from './Dashboard/TaskList';
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import UpdateTask from './Dashboard/UpdateTask';
import Notifaction from './Dashboard/Notifaction';
import Faq from './Pages/FAQ/Faq';
import About from './Pages/About/About';



const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,

      },
      {
      path:"/faq",
      element:<Faq></Faq>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>

      },
      {
       path:'/about',
       element:<About></About>
      }
    ],
   
  },
  {
    path:"/dashboard",
    element:<Dashboard></Dashboard>,
    children:[
      {
        path:"/dashboard",
        element:<AddTask></AddTask>
      },
      {
        path:"/dashboard/task",
        element:<TaskList></TaskList>
      },
      {
        path: "/dashboard/updateTask/:id",
        element: <UpdateTask></UpdateTask>,
      },
      {
        path:"/dashboard/notification",
        element:<Notifaction></Notifaction>
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <AuthProvider>
    
    <QueryClientProvider client={queryClient}>
    
    <RouterProvider router={router} />
    </QueryClientProvider>
      
    </AuthProvider>
  </React.StrictMode>,
)
