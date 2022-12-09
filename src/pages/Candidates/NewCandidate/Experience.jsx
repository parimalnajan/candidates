import React from 'react'
import { useInput } from '../../../hooks/UseInput'

const Experience = () => {
  const [company,setCompany,clearCompany,companyInput]=useInput("text","p-4")


  return (
    <div>
      <h4 className='text-lg font-semibold text-gray-600 my-4 mb-1'>Experience Summary</h4>
      {companyInput}
      {company}

    </div>
  )
}
export default Experience