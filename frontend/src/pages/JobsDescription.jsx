import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from "../components/ui/badge";
import axios from 'axios';
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '../api/User.js';
import { useParams } from 'react-router-dom';
import { setSingleJob } from '../redux/jobs.slice';
import { useDispatch, useSelector } from 'react-redux';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (singleJob?.applications && user?._id) {
      const alreadyApplied = singleJob.applications.some(
        (val) => val.applicant === user._id
      );
      setIsApplied(alreadyApplied);
    }
  }, [singleJob, user]);

  const handleApplyJob = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user?._id }
          ]
        };

        dispatch(setSingleJob(updatedSingleJob));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id))
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobId) fetchJob();
  }, [jobId, dispatch]);

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>

          <div className='flex items-center gap-2 mt-4'>
            <Badge variant="ghost" className='text-blue-700 font-bold'>
              {singleJob?.position} Positions
            </Badge>

            <Badge variant="ghost" className='text-[#F83002] font-bold'>
              {singleJob?.jobType}
            </Badge>

            <Badge variant="ghost" className='text-[#7209b7] font-bold'>
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={!isApplied ? handleApplyJob : undefined}
          disabled={isApplied}
          className={`rounded-lg px-6 py-3 font-bold text-white transition-all duration-200 ${
            isApplied
              ? 'bg-gray-500 cursor-not-allowed opacity-60'
              : 'bg-[#F83002] hover:bg-[#dc2626] active:scale-95 shadow-lg'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h1 className='border-b-2 border-gray-300 font-medium py-4'>
        {singleJob?.title}
      </h1>

      <div className='my-4'>
        <p className='font-bold my-1'>
          Role:
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.title}
          </span>
        </p>

        <p className='font-bold my-1'>
          Location:
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.location}
          </span>
        </p>

        <p className='font-bold my-1'>
          Description:
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.description}
          </span>
        </p>

        <p className='font-bold my-1'>
          Experience:
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.experienceLevel} years
          </span>
        </p>

        <p className='font-bold my-1'>
          Salary:
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.salary} LPA
          </span>
        </p>

        <p className='font-bold my-1'>
          Total Applicants:
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.applications?.length || 0}
          </span>
        </p>

        <p className='font-bold my-1'>
          Posted Date:
          <span className='pl-4 font-normal text-gray-800'>
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
