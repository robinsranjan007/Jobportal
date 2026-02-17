 import Navbar from '../components/shared/Navbar'
import React from 'react'
import HeroSection from '../components/HeroSection'
import CategoryCarousel from '../components/CategoryCarousel'
import LatestJobs from '../components/LatestJobs'
import Footer from '../components/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'

function Home() {
  useGetAllJobs()
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestJobs/>
    <Footer/>
    </>
  )
}

export default Home