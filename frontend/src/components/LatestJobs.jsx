import React from 'react'
import JobsCards from './JobsCards'
import { useSelector } from 'react-redux'

function LatestJobs() {
  
  const randomjobs=[1,2,3,4,5,6,7,8]

  const {allJobs} = useSelector(store=>store.job)

  return (
    <div className='max-w-7xl mx-auto my-20 '>
      <h1 className='text-4xl font-bold '><span className='text-[#f83002]'>Latest & Top</span> Job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'> 
    {
    allJobs && allJobs.length>0? ( allJobs?.slice(0,6).map((val,index)=>(
        <JobsCards job={val} key={val._id}  />
      ))):(
        <span>No jobs Available</span>
      )
    }
      </div>

    </div>
  )
}

export default LatestJobs