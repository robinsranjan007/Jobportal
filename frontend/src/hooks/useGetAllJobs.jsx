import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../api/User.js'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobs.slice'

function useGetAllJobs() {
    const dispatch = useDispatch()
   useEffect(()=>{
    const fetchAllJobs = async ()=>{
        try {
            const res= await axios.get(`${JOB_API_END_POINT}/get`,{withCredentials:true})

            if(res.data.success)
            {
                dispatch(setAllJobs(res.data.jobs))
            }

        } catch (error) {
            console.log(error)
        }
    }

fetchAllJobs()
   },[])




}

export default useGetAllJobs