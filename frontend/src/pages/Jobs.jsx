import Joblist from "../components/Joblist";
import FilterCard from "../components/FilterCard";
import Navbar from "../components/shared/Navbar";
import React from "react";
import { useSelector } from "react-redux";

function Jobs() {
  const {alljobs} =useSelector(store=>store.job)
 

  return (
  <div>
    <Navbar />
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5">
        <div className="w-[15%]">
          <FilterCard />
        </div>
        {
          alljobs.length <= 0 ? <span>Job not found</span> : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-3">
                {
                  alljobs.map((item, index) => (
                    <div>
                      <Joblist job={item}  />
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  </div>
);
}

export default Jobs;
