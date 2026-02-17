import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

function FilterCard() {

const filterData = [
  {filterType:"Location",
    array:["Delhi","Bangalore","Hyderabad","Pune","Mumbai"]
  },
  {filterType:"Industry",
    array:["FrontEnd Developer","Backend Developer","FullStack Developer"]
  },
  {filterType:"Salary",
    array:["0-40k","42-1lakh","1lakh to 5lakh"]
  },

]

  return (
    <div className='w-full bg-white p-3 rounded-md'> 

    <h1 className='font-bold text-lg'>Filter Jobs</h1>
    <hr  className='mt-3'/>
    <RadioGroup>
      {filterData.map((data,index)=>(
        <div key={index}>
          <h1 className='font-bold text-lg'>{data.filterType}</h1>
          {
            data.array.map((item,idx)=>(
              <div key={idx} className='flex items-center space-x-2 my-2'>
                <RadioGroupItem value={item} id={`${data.filterType}-${idx}`} />
                <Label htmlFor={`${data.filterType}-${idx}`}>{item}</Label>
              </div>
            ))
          }
        </div>
      ))}
    </RadioGroup>

    </div>
  )
}

export default FilterCard