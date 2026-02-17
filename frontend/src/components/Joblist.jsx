import React from 'react';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Joblist = ({ job }) => {
  const navigate = useNavigate();

  const daysPast = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;

    // Correct formula for days
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysPast(job?.createdAt) === 0
            ? "Today"
            : `${daysPast(job?.createdAt)} days ago`}
        </p>

        <button className="rounded-full p-2 border">
          <Bookmark size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <div className="p-2">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </div>

        <div>
          <h1 className="font-medium">{job?.companyname}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex gap-2 items-center mt-4">
        <Badge>{job?.position} Positions</Badge>
        <Badge>{job?.jobType}</Badge>
        <Badge>{job?.salary}</Badge>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="px-4 py-2 bg-[#F83002] text-white font-medium rounded-md hover:bg-[#d62b00] transition-colors"
        >
          Details
        </button>

        <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition-colors">
          Save for later
        </button>
      </div>
    </div>
  );
};

export default Joblist;
