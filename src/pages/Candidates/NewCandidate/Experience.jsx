import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { FormContext } from '.'
import { useInput } from '../../../hooks/UseInput'

const Experience = () => {
  const {steps,currentStep,handleNextStep,currentCandidate,setFormState,formState} = useContext(FormContext)

  const [experienceDetails,setExperienceDetails] = useState([])
  useEffect(() => {
    if(currentCandidate && experienceDetails?.length===0){
    setExperienceDetails(currentCandidate.experience)
  }
   }, [currentCandidate])
   
  const submitExperience = () =>{
    setFormState((old)=>{return {...old,experienceDetails}})
  }
const [showForm, setshowForm] = useState(false)

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-600 my-4 mb-1">
        Experience Summary
      </h4>
      <button onClick={()=>setshowForm(!showForm)} className='button-base bg-purple-400'>{`${showForm?"Collapse Form":"Add New"}`}</button>
      {showForm?<AddEditExperience editMode={false} setExperienceDetails={setExperienceDetails} />:<></>}
        
      {
        experienceDetails?.map((x,index)=>{
          return( <div className="flex flex-col">
            <AddEditExperience editMode={true} expEntry={x} 
            setExperienceDetails={setExperienceDetails} experienceDetails={experienceDetails} index={index} 
            />
            </div>
          )
          }
        )
      }
      <button
        onClick={()=>submitExperience()} 
        className='button-base bg-blue-400'>Submit Experience</button>
      </div>
  );
}

  const AddEditExperience = ({editMode,expEntry,setExperienceDetails,experienceDetails,index,}) =>{

    const {steps,currentStep,handleNextStep,currentCandidate,setFormState,formState} = useContext(FormContext)

  const [company,setcompany,clearCompany,companyInput]=useInput("text","p-4")
  const [role,setrole,clearrole,roleInput]=useInput("text","p-4")
  const [project,setproject,clearproject,projectInput]=useInput("text","p-4")
  const [teamSize,setteamSize,clearteamSize,teamSizeInput]=useInput("text","p-4")
  let [dateFrom,setdateFrom,cleardateFrom,dateFromInput]=useInput("date","p-4")
  let [dateTo,setdateTo,cleardateTo,dateToInput]=useInput("date","p-4")
 
  useEffect(() => {
    if(editMode===true){
    setcompany(expEntry.company)    
    setrole(expEntry.role)    
    setteamSize(expEntry.team_size)    
    setproject(expEntry.project)    
    setdateFrom(expEntry.duration_to)    
    setdateTo(expEntry.duration_from)    }

    console.log(experienceDetails)
  }, [experienceDetails])

  useEffect(() => {
  //   const d = new Date(dateTo)
  // console.log(d);
  //    const year = new Date(d).getFullYear();
  //   const month = new Date(d).getMonth()+1;
  // console.log(year,month);
   }, [dateTo])
  

  const submit = (editMode) =>{
    const expObject = {
      company,
      project,
      role,
      team_size:teamSize,
      duration_from:dateFrom,
      duration_to:dateTo
    }

    if(editMode===false)
    {  setExperienceDetails((oldData)=> {
      if(!oldData){
        return[expObject]
      }
      return [...oldData,expObject]})
    }else{
           // setExperienceDetails((oldData)=> {return [...oldData[index]=expObject]})
           let temp = experienceDetails;
           temp[index] = expObject
           setExperienceDetails((old)=> old=temp)
    }

  }
  const [successText, setsuccesstext] = useState(false)
  const showSuccessText = () =>{
    setsuccesstext(true)
    setTimeout(() => {
      setsuccesstext(false)
    }, 5000);
  }
  const [showEditForm,setShowEditForm] = useState(false)

    return(<div className='m-4 border-4 rounded-md p-4'>

    {editMode===true
      ?<div >
      <button
      onClick={()=>{setShowEditForm(true)}} 
      className='button-base bg-purple-400'>edit</button>
      {/* <AddEditExperience editMode={true} experienceEntry={expEntry}/> */}
      <div>{expEntry.company}</div>
      <div>{expEntry.role}</div>
      <div>{expEntry.project}</div>
      <div> {expEntry.team_size}</div>
      <span> {expEntry.duration_from} -</span>
      <span> {expEntry.duration_to}</span>      
      </div>
      :<></>}

      {editMode===false || (editMode===true && showEditForm===true)?
        <div className='grid grid-cols-2'>
          <div>
          <legend>Company</legend>
          {companyInput}
          </div>
          <div>
            <legend>Role</legend>
            {roleInput}
          </div>
          <div>
            <legend>Project</legend>
            {projectInput}
          </div>
          <div>
            <legend>Team Size</legend>
            {teamSizeInput}
          </div>
          <div>
            <legend>From Date</legend>
            {dateFromInput}
          </div>
          <div><legend>To</legend>
          {dateToInput}
          </div>
          {editMode===true?
            <>
              <button className ='button-base bg-purple-400 ' onClick={()=>{submit(editMode=true);showSuccessText()}}>Finish edit</button>
              {successText?<span className='ml-4 mt-1 text-green-700'>saved!</span>:<></>} 
            </>
            :<button className ='button-base bg-purple-400 mt-8' onClick={()=>submit(editMode=false)}>Add new experience</button>
          }
        </div>
        :<></>
        }
        
      </div> 
    
  )
    
  }
export default Experience