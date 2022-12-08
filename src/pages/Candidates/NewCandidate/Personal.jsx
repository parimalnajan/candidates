import React, { useContext,useEffect,useState} from 'react'
import { FormContext } from '.'


// const Personal = ({data:{steps,currentStep,currentCandidate,setFormState,formState,isAddMode}}) => {
const Personal = ({isAddMode}) => {
  const {steps,currentStep,handleNextStep,currentCandidate,setFormState,formState} = useContext(FormContext)

  const [email,setEmail]=useState('');
  const [candidateName,setCandidateName]=useState('');
  const [profilePicture,setProfilePicture]=useState('');
  const [gender, setGender] = useState("Male");
  const [hobby, setHobby] = useState('');
  const [hobbiesArray,setHobbiesArray]= useState([])
  
  const [value, setValue] = useState(0); // integer state

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
    setEmail(formState.email)
    setCandidateName(formState.name)
    setEmail(formState.email)
    setGender(formState.gender)
    setProfilePicture(formState.profile_picture)
    setHobbiesArray(formState.hobbies)
  }
},[currentStep])

function onSubmit() {
    //try : create a new object then spread in below setState
    setFormState((oldState)=>{ console.log('setting',{oldState});return {...oldState,hobbies:hobbiesArray,gender,profile_picture:profilePicture,name:candidateName,}})
    console.log("1",formState)

    handleNextStep()
  
}
  return (
    <>
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
    </div>
      {
        <button onClick={onSubmit} className='button-base bg-purple-600 mt-8 text-gray-50'> 
        Save and proceed  </button>
      }
      </>
  )
}

export default Personal