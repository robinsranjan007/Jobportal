import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {USER_API_END_POINT} from "../../api/User.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading ,setUser} from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

function Login() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    role: "",
  });
const {isLoading} = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, formdata, {
        
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user))
        navigate("/home");
      }

   

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
    finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-3/7 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={formdata.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              value={formdata.password}
              onChange={handleChange}
              name="password"
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
                  type="radio"
                  name="role"
                  onChange={handleChange}
                  checked={formdata.role === "user"}
                  value="user"
                  id="user"
                  className="cursor-pointer w-4 h-4 text-red-500 focus:ring-red-500"
                />
                <label
                  htmlFor="user"
                  className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                >
                  User
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  onChange={handleChange}
                  checked={formdata.role === "recruiter"}
                  value="recruiter"
                  id="recruiter"
                  className="cursor-pointer w-4 h-4 text-red-500 focus:ring-red-500"
                />
                <label
                  htmlFor="recruiter"
                  className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Recruiter
                </label>
              </div>
            </div>
          </div>
    {
              isLoading?(<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin">
                
                </Loader2></Button>):(
                  <Button type="submit" className="w-full my-4" >
                    login
                  </Button>
                )
            }
          

          <p className="text-sm text-center text-gray-600">
            Dont't have an account?{" "}
            <Link
              to="/signup"
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;