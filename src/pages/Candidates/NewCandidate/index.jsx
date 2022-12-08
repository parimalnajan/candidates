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
          // setCandidateName(resData.name)
          // setEmail(resData.email)
          // setGender(resData.gender)
          // setProfilePicture(resData.profile_picture)
          // setHobbiesArray(resData.hobbies)
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
  
    const steps = [{id:1,name:"Personal"},{id:2,name:"Skills"},{id:3,name:"Education"},{id:4,name:"Experience"}]
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
    {/* <button className='button-base bg-gray-100' onClick={()=>handleNextStep()}>-wip- next</button> */}
    <h1 className='text-xl  font-semibold text-gray-600'>{isAddMode ? "Add New Candidate" : "Edit Candidate"}</h1>
    <div>{id}</div>
          { currentStep===1? 
          
            <>
          <Personal isAddMode={isAddMode}/>
            {/* 
            <label >
            <legend>Name</legend>
              <input
                name="name"
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                required
              />
            </label>
    
              <legend>Email</legend>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
    
            <label>
              <legend>  Profile Picture URL</legend>
            
              <input
                name="profilepicture"
                type="text"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                required
              />
            </label>
            <label>
              <legend>Gender</legend>
            <div className='' onChange={(e) => setGender(e.target.value)}>
            <input className='!w-4' type="radio" value="Male" name="gender" checked={gender === "Male"} />Male
              <input className='!w-4' type="radio" value="Female" name="gender" checked={gender === "Female"}/>Female
        </div>
        </label>
          <div>
            <label>
              <div className='flex  gap-2 '>
                <legend>Hobbies</legend>
                 
                  {
                    hobbiesArray?.map((hobby)=>{
                      return (
                        <div className='px-2 py-1 rounded-lg bg-gray-200 w-fit'>
                          {hobby}
                           <span onClick={()=>setHobbiesArray(old=>
                            old.filter((data)=> data!= hobby))}
                            className='pl-1 ml-1 text-red-600'>
                            x
                            </span>
                        </div>)
                    })
                  }
                </div>
              <input
                name="hobbies"
                type="text"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
              />
              <button onClick={(e)=>{ e.preventDefault();
              if(!hobbiesArray)
                setHobbiesArray([hobby])
              else{setHobbiesArray(hobbiesArray=>[...hobbiesArray,hobby]);} 
              setHobby('')}}
              className='bg-purple-400 px-2 py-1 rounded-md'>Add</button>
            </label>
          </div> */}


            </>



        :currentStep===4?<Education />
        :currentStep===3?<Experience />
        :currentStep===2?<Skills/>
        :null
      }

<button className='button-base block mt-2 bg-gray-300 mr-4' onClick={()=>handlePrevStep()}>back</button>

                  <div className="x">
            {
              currentStep===steps.length-2?isAddMode
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