import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { FormContext } from '.'
import { useInput } from '../../../hooks/UseInput'

const Skills = () => {
  const {steps,currentStep,handleNextStep,currentCandidate,setFormState,formState} = useContext(FormContext)
  const [skill,useSkill,clearSkill,skillInput]=useInput("text","p-4")
  const [experience,useExperience,clearExperience,experienceInput]=useInput("number","p-8")
  const [skillsArray,setSkillsArray] = useState(currentCandidate.skills)
  useEffect(() => {
    // console.log(skillsArray,currentCandidate);
  }, [skillsArray])

  const submitSkills = () =>{
    setFormState((oldState)=>{console.log(oldState);return {...oldState,skills:skillsArray}})
    handleNextStep()
  }
  return (
    <div>
      <h4 className='text-lg font-semibold text-gray-600 my-4 mb-1'>Skills Summary</h4>
        {!skillsArray? <> Your skills will appear here</>:skillsArray.length===0?<>Your skills will appear here</>:<></>}
          <div className='mb-8 flex gap-2'>
            {
              skillsArray?.map((skill,index)=>{
                return (
                  <div className='px-2 py-1 rounded-lg bg-gray-200 w-fit'>
                    {skill.name} ({skill.experience})
                    <button onClick={()=>setSkillsArray(old=>
                      old.filter((data)=> data!= skill))}
                      className='pl-1 ml-1 text-red-600 '>
                      x
                      </button>
                  </div>)
                })
            }
          </div>

          <legend>Skill</legend>
            <div>{skillInput}</div>
          <legend>Experience (months)</legend>
            {experienceInput}

            <button 
              className='bg-purple-400 px-2 py-1 rounded-md'
              onClick={(e)=>{ e.preventDefault();
                if(!skillsArray){setSkillsArray([{name:skill,experience:experience}])}
                else{setSkillsArray(skillsArray=>[...skillsArray,{name:skill,experience:experience}]);} 
                }}
            >Add</button>
          <button onClick={submitSkills} className='button-base block mt-12 bg-purple-600 text-gray-100'>Save and proceed</button>
        </div>
  )
}

export default Skills