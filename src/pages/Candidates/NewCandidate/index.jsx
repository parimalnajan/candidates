import React, { createContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createNewCandidate, getCandidateById, updateCandidateDetails } from '../../../utils';
import Education from './Education';
import Experience from './Experience';
import './NewCandidate.css'
import Personal from './Personal';
import ProgressIndicator from './ProgressIndicator';
import Skills from './Skills';
export const FormContext= createContext("default")

const NewCandidate = ({isAddMode}) => {

  const [currentCandidate,setCurrentCandidate]=useState({})
  const [formState,setFormState]=useState({});

  const selectedId= useParams();
  const id = selectedId.id

function createUser(data) {
  (async () => {
    const resData = await createNewCandidate(data)
    console.log(resData)
  })();
  console.log("prepsot",data)
}

function updateUser(id, data) {
  (async () => {
    const resData = await updateCandidateDetails(id,data)
    console.log(resData)
  })();
  console.log("prepsot",id,data)
}

  useEffect( () => {
    if(isAddMode){
      
      return
    }
      (async () => {
          const resData = await getCandidateById(id)
          setCurrentCandidate(resData)
          setFormState(resData)
    })();
  }, [selectedId.id])

  function onSubmit() {

      return isAddMode===true
          ? createUser(formState)
          : updateUser(id, formState);
  }

  useEffect(() => {
    console.log({formState})
  }, [formState])
  
    const steps = [{id:1,name:"Personal"},{id:2,name:"Skills"},{id:3,name:"Experience"},{id:4,name:"Education"}]
    const [currentStep,setCurrentStep] = useState(1);
  
    const handleNextStep = () => {
      if(currentStep===steps.length )
      {alert("/end"); return}
      setCurrentStep(oldState=> oldState+1)
    }
  
    const handlePrevStep=()=>{
      if(currentStep===steps[0].id)
      {alert("/end"); return}
      setCurrentStep(oldState=> oldState-1)

    }
  return (
    <div className='text-left form-component p-8'> 
      <FormContext.Provider value={{steps,currentStep,handleNextStep,formState,setFormState,currentCandidate,isAddMode}}>
        <ProgressIndicator/>
        <h1 className='text-xl  font-semibold text-gray-600'>{isAddMode ? "Add New Candidate" : "Edit Candidate"}</h1>
        <div>{id}</div>
          {
            currentStep===1?<Personal isAddMode={isAddMode}/>
            :currentStep===4?<Education />
            :currentStep===3?<Experience />
            :currentStep===2?<Skills/>
            :null
          }
          <button className='button-base block mt-2 bg-gray-300 mr-4' onClick={()=>handlePrevStep()}>back</button>
            <div>
              {
                currentStep===steps.length?isAddMode
                ?<button onClick={onSubmit} className='button-base bg-blue-400 mt-8 text-gray-50'> 
                Submit New Candidate </button>
                :<button onClick={onSubmit} className='button-base  bg-blue-400 px-2 py-1 mt-8  '>
                Submit Form Changes</button>:<></>
              }
            </div>
      </FormContext.Provider>
    </div>
  );
}

export default NewCandidate