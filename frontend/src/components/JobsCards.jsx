import { Badge } from './ui/badge'
import React from 'react'

function JobsCards( {job}) {

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>

        <h1 className='font-medium text-lg '>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500' >India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'> {job?.description}</p>
        </div>
        <div className='flex gap-5 items-center mt-4'>
            <Badge>{job?.position} position</Badge>
            <Badge>{job.jobType}</Badge>
            <Badge>{job.salary}</Badge>
        </div>

    </div>
  )
}

export default JobsCards