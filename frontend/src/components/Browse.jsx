
import React from 'react'
import Navbar from './shared/Navbar'
import Joblist from './Joblist'

function Browse() {

const randomjobs = [1,2,3,4,5,6]

  return (
    <div> 
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10 '>
            <h1 className='font-bold text-xl my-10'>Search Reasults {randomjobs.length}</h1>
            <div className='grid grid-cols-3 gap-4 mt-5'>
   {
                randomjobs.map((item,index)=>(
                    <Joblist/>
                ))
            }
            </div>
         
        </div>
    </div>
  )
}

export default Browse