import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createNewCandidate, getCandidateById, updateCandidateDetails } from '../../../utils';
import './NewCandidate.css'

const NewCandidate = ({isAddMode}) => {
  
const [email,setEmail]=useState('');
const [candidateName,setCandidateName]=useState('');
const [profilePicture,setProfilePicture]=useState('');
const [gender, setGender] = useState("Male");
const [hobby, setHobby] = useState('');
const [hobbiesArray,setHobbiesArray]= useState([])

const [currentCandidate,setCurrentCandidate]=useState({})

  const selectedId= useParams();
  const id = selectedId.id

function onSubmit() {
  const dataToSubmit={    
    hobbies:hobbiesArray,
    name:candidateName,
    email:email,
    gender:gender,
    profile_picture:profilePicture,}
    return isAddMode===true
        ? createUser(dataToSubmit)
        : updateUser(id, dataToSubmit);
}

function createUser(data) {
  (async () => {
    const resData = await createNewCandidate(data)
    console.log(resData)
  })();
}

function updateUser(id, data) {
  
  (async () => {
    const resData = await updateCandidateDetails(id,data)
    console.log(resData)
  })();
  
}
useEffect( () => {
 if(isAddMode){
  return
 }
  (async () => {
      const resData = await getCandidateById(id)
      setCurrentCandidate(resData)
      setCandidateName(resData.name)
      setEmail(resData.email)
      setGender(resData.gender)
      setProfilePicture(resData.profile_picture)
      setHobbiesArray(resData.hobbies)

})();
setCandidateName(currentCandidate.name)
}, [selectedId.id])

  return (
    <div className='text-left form-component p-8'> 
        <h1 className='text-xl  font-semibold text-gray-600'>{isAddMode ? "Add New Candidate" : "Edit Candidate"}</h1>
        <div>{id}</div>
        <label>
        <legend>Name</legend>
          <input
            name="name"
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            required
          />
        </label>

        <label>
          <legend>Email</legend>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

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
          isAddMode
          ?<button onClick={onSubmit} className='bg-purple-600 px-2 py-1 rounded-md mt-8 text-gray-50'> 
          Submit </button>
          :<button onClick={onSubmit} className='bg-purple-600 px-2 py-1 rounded-md mt-8  text-gray-50'>
          Submit Changes</button>
        }
    </div>
  );
}

export default NewCandidate