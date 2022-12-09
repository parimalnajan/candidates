import React from 'react'
import { useInput } from '../../../hooks/UseInput'

const Education = () => {
  const [school,setSchool,clearSchool,schoolInput]=useInput("text","p-4")


  return (
    <div>
      <h4 className='text-lg font-semibold text-gray-600 my-4 mb-1'>Education Summary</h4>
      {schoolInput}
      {school}

    </div>
  )
}

export default Education