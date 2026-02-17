import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";  
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/authSlice";   
import { toast } from "sonner";
import {USER_API_END_POINT} from "../api/User.js";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [formdata, setFormdata] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",  // Convert array to string
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filehandle = (e) => {
    const file = e.target.files?.[0];
    setFormdata((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();  

    formData.append("fullname", formdata.fullname);
    formData.append("email", formdata.email);
    formData.append("phoneNumber", formdata.phoneNumber);
    formData.append("bio", formdata.bio);
    formData.append("skills", formdata.skills); // Backend will split by comma

    if (formdata.file) {
      formData.append("file", formdata.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update profile");  
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Name
              </Label>
              <Input
                value={formdata.fullname}
                onChange={handleChange}
                id="fullname"
                name="fullname"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                value={formdata.email}
                onChange={handleChange}
                id="email"
                name="email"
                type="email"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone
              </Label>
              <Input
                value={formdata.phoneNumber}
                onChange={handleChange}
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                value={formdata.bio}
                onChange={handleChange}
                id="bio"
                name="bio"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                value={formdata.skills}
                onChange={handleChange}
                id="skills"
                name="skills"
                placeholder="HTML, CSS, JavaScript"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                onChange={filehandle}
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            {loading ? (
              <Button disabled className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;