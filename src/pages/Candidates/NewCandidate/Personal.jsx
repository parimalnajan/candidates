import React, { useContext,useEffect,useState} from 'react'
import { FormContext } from '.'
import { useInput } from '../../../hooks/UseInput'


// const Personal = ({data:{steps,currentStep,currentCandidate,setFormState,formState,isAddMode}}) => {
const Personal = ({isAddMode}) => {
  const {steps,currentStep,handleNextStep,currentCandidate,setFormState,formState} = useContext(FormContext)

  const [email,setEmail,clearEmail,emailInput]=useInput("text","p-4")
  const [candidateName,setCandidateName,clearCandidateName,candidateNameInput]=useInput('');
  const [profilePicture,setProfilePicture,clearprofilePicture,profilePictureInput]=useInput('');
  const [hobby, setHobby, clearHobby,hobbyInput] = useInput('');
  
  const [gender, setGender] = useState("");
  const [hobbiesArray,setHobbiesArray]= useState([])  

  useEffect( () => {  //initial load and hydration of state 

    // (async () => {
    //   setCurrentCandidate(resData)
    if(isAddMode){
      // const resData = currentCandidate    // TODO : fix stale form state when switching from edit to new
      // setCandidateName("")
      // setEmail("")
      // setGender("")
      // setProfilePicture('')
   }else{
        const resData = currentCandidate
        setCandidateName(resData.name)
        setEmail(resData.email)
        setGender(resData.gender)
        setProfilePicture(resData.profile_picture)
        setHobbiesArray(resData.hobbies)
   }
  // })();
},[currentCandidate] )


useEffect(()=>{     // to maintain form state to go back and forth  // TODO : try with sessionStorage
  if(isAddMode){   

    setCandidateName(formState.name)
    setEmail(formState.email)
    setGender(formState.gender)
    setProfilePicture(formState.profile_picture)
    setHobbiesArray(formState.hobbies)
  }
},[currentStep])

function onSubmit() {
    //try : create a new object then spread in below setState
    setFormState((oldState)=>{ console.log('setting',{oldState});return {...oldState,email,hobbies:hobbiesArray,gender,profile_picture:profilePicture,name:candidateName,}})
    console.log("1",formState)

    handleNextStep()
  
}
  return (
    <>
      <legend>Name</legend>
      {candidateNameInput}

        <legend>Email</legend>
        {emailInput}

        <legend>  Profile Picture URL</legend>
      {profilePictureInput}

        <legend>Gender</legend>
      <div className='' onChange={(e) => setGender(e.target.value)}>
        <input className='!w-4' type="radio" value="Male" name="gender" checked={gender === "Male"} />Male
        <input className='!w-4' type="radio" value="Female" name="gender" checked={gender === "Female"}/>Female
      </div>
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
          {hobbyInput}
          <button onClick={(e)=>{ e.preventDefault();
          if(!hobbiesArray)
            setHobbiesArray([hobby])
          else{setHobbiesArray(hobbiesArray=>[...hobbiesArray,hobby]);} 
          setHobby('')}}
          className='bg-purple-400 px-2 py-1 rounded-md'>Add</button>
        </label>
      </div>
      {
        <button onClick={onSubmit} className='button-base bg-purple-600 mt-8 text-gray-50'> 
        Save and proceed  </button>
      }
      </>
  )
}

export default Personal