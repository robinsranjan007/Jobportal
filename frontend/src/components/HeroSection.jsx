import React from 'react'
import { Search } from 'lucide-react'

function HeroSection() {



  return (
  <div className="text-center py-20 px-4">
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      
      <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] text-sm font-medium">
        No. 1 Job Hunt Website
      </span>

      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Search, Apply & <br />
        Get Your <span className="text-[#f83002]">Dream Job</span>
      </h1>

      <p className="text-gray-600">
        Discover thousands of job opportunities tailored to your skills and passion.
      </p>

      {/* Search Bar */}
      <div className="flex items-center w-full md:w-[70%] lg:w-[60%] mx-auto bg-white shadow-lg border border-gray-200 rounded-full overflow-hidden">
        
        <input
          type="text"
          placeholder="Find your dream job"
          className="flex-1 px-6 py-3 outline-none"
        />

        <button className="bg-[#f83002] hover:bg-[#f83002] px-6 py-3 text-white flex items-center justify-center">
          <Search className="h-5 w-5" />
        </button>
      </div>

    </div>
  </div>
)

}

export default HeroSection