import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {USER_API_END_POINT} from '../../api/User.js'
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {

const [formdata,setFormdata] = useState({
  fullname:'',
  email:'',
  phoneNumber:'',
  password:'',
  role:"",
  file:null
})

const {isLoading} = useSelector(store=>store.auth)
const dispatch = useDispatch()

const handleChange=(e)=>{

const {name,value} = e.target
 setFormdata((prev)=>({
  ...prev,[name]:value
 }))

  
}

const navigate = useNavigate()

const handleFile=(e)=>{
  setFormdata({...formdata,file:e.target.files?.[0]})
}



const handleSubmit=async(e)=>{
  e.preventDefault()
  try {
    dispatch(setLoading(true))
    const data = new FormData();
  data.append("fullname", formdata.fullname);
  data.append("email", formdata.email);
  data.append("phoneNumber", formdata.phoneNumber);
  data.append("password", formdata.password);
  data.append("role", formdata.role);
if (formdata.file) {
    data.append("file", formdata.file);
  }

    const res = await axios.post(`${USER_API_END_POINT}/register`,data,{
      headers:{
        "Content-Type":"multipart/form-data"
      },
      withCredentials:true
    })
    if(res.data.success)
    {
      toast.success(res.data.message);
      navigate("/login")
    }
    

  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Signup failed");
   
  }
  finally{
    dispatch(setLoading(false))
  }
  
}



  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="w-3/7 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          
          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
            name="fullname"
            value={formdata.fullname}
            onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
            name="email"
            value={formdata.email}
            onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
            name="phoneNumber"
            value={formdata.phoneNumber}
            onChange={handleChange}
              type="text"
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
            name="password"
            value={formdata.password}
            onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="my-5">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Role
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                onChange={handleChange}
                  type="radio"
                  name="role"
                  value="user"
                   checked={formdata.role === "user"}
                  id="user"
                  className="cursor-pointer w-4 h-4 text-red-500 focus:ring-red-500"
                />
                <label htmlFor="user" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                  User
                </label>
              </div>
              <div className="flex items-center">
                <input
                onChange={handleChange}
                  type="radio"
                  name="role"
                   checked={formdata.role === "recruiter"}
                  value="recruiter"
                  id="recruiter"
                  className="cursor-pointer w-4 h-4 text-red-500 focus:ring-red-500"
                />
                <label htmlFor="recruiter" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                  Recruiter
                </label>
              </div>
            </div>
          </div>

          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <input
            name="file"
            onChange={handleFile}
              accept="image/*"
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
            />
          </div>

      {isLoading ? (
  <button
    type="button"
    disabled
    className="w-full bg-red-500 text-white font-semibold py-2 rounded-md my-4 flex justify-center items-center"
  >
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Please wait...
  </button>
) : (
  <button
    type="submit"
    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition-all shadow-md hover:shadow-lg my-4"
  >
    Sign Up
  </button>
)}

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-600 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;