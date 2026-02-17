import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

 
import Home from './pages/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './pages/Jobs'
import Browse from './components/Browse'
import Profile from './pages/Profile'
import JobsDescription from './pages/JobsDescription'

const appRouter =createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/home',
    element:<Home/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
path:"/description/:id",
element:<JobsDescription/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
])
 
 function App() {
   return (
    <>
     
   <RouterProvider router={appRouter} />
    </>
   )
 }
 
 export default App