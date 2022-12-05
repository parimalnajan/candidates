import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { getCandidateById } from '../../../utils';
import './NewCandidate.css'

const NewCandidate = ({isAddMode}) => {
  
const [email,setEmail]=useState('');
const [candidateName,setCandidateName]=useState('');
const [profilePicture,setProfilePicture]=useState('');
const [gender, setGender] = useState("Male");
const [hobby, setHobby] = useState('');
const [hobbiesArray,setHobbiesArray]= useState([])

const [currentCandidate,setCurrentCandidate]=useState({})

  const navigate= useNavigate()
  const selectedId= useParams();
  const id = selectedId.id
  
  const [dataToSubmit,setDataToSubmit] = useState({

  })
  const dataNew = {
    "profile_picture": "testing-sasuke",
    "name": "sasuke uchiha",
    "address": "not lif",
    "phone": "9879879870",
    "email": "test.naruto@nonstopio.com",
    "gender": "male",
    "hobbies": [
    "Reading",
    "Music"
    ],
    "education": [
    {
    "institute": "ABC School",
    "degree": "10th",
    "percentage": 99,
    "pass_out_year": 2010
    },
    {
    "institute": "ABC School",
    "degree": "10th",
    "percentage": 99,
    "pass_out_year": 2010
    }
    ],
    "skills": [
    {
    
    "name": "Java",
    "experience": 4
    },
    {
    "name": "Java",
    "experience": 4
    },
    {
    "name": "Java",
    "experience": 4
    }
    ],
    "experience": [
    {
    "company": "ABC PVT LTD",
    "project": "Some prohect",
    "role": "SSE",
    "team_size": 4,
    "duration_from": "Jan 2021",
    "duration_to": "Nov 2021"
    },
    {
    "company": "ABC PVT LTD",
    "project": "Some prohect",
    "role": "SSE",
    "team_size": 4,
    "duration_from": "Jan 2021",
    "duration_to": "Nov 2021"
    },
    {
    "company": "ABC PVT LTD",
    "project": "Some prohect",
    "role": "SSE",
    "team_size": 4,
    "duration_from": "Jan 2021",
    "duration_to": "Nov 2021"
    }
    ],
    "id": "1"
    }

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
  console.log(data)
  console.log(JSON.stringify(data))
  const post = async (data)=>{
    const url='https://60d5a2c2943aa60017768b01.mockapi.io/candidate'
         const response = await fetch(url, {
           method: 'POST',
           headers: {
               'Content-type': 'application/json'
           },
           body: JSON.stringify(data)
       });
       // Awaiting response.json()
       const resData = await response.json();
       // Returning result data
       console.log(resData) 
 
   }
   post(data) 
}

function updateUser(id, data) {
  console.log(id,data)
    
  const put =async (id, data) =>{
    const url=`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`
 
         const response = await fetch(url, {
           method: 'PUT',
           headers: {
               'Content-type': 'application/json'
           },
           body: JSON.stringify(data)
       });
 
       // Awaiting response.json()
       const resData = await response.json();
 
       // Returning result data
       console.log(resData) 
       //---------can only send changed data to replace
       
   }

   put(id,data)
}


useEffect( () => {
 if(isAddMode){
  return
 }
  (async () => {
      const resData = await getCandidateById(id)
      setCurrentCandidate(resData)
      console.log(resData)
      setCandidateName(resData.name)
      setEmail(resData.email)
      setGender(resData.gender)
      setProfilePicture(resData.profile_picture)
      setHobbiesArray(resData.hobbies)

})();
setCandidateName(currentCandidate.name)

}, [selectedId.id])


  return (
    <div className='text-left form-component'
    > 
      <div>{id}</div>
    
        <h1>{isAddMode ? "Add User" : "Edit User"}</h1>
        <label>
          Name
          <input
            name="name"
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className='text-left'>
        <label>
          Profile Picture URL
          <input
            name="profilepicture"
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            required
          />
        </label>
        </div>
        <div onChange={(e) => setGender(e.target.value)}>
          <input type="radio" value="Male" name="gender" checked={gender === "Male"} /> Male
          <input type="radio" value="Female" name="gender" checked={gender === "Female"}/> Female
    </div>
        <div>
        <label>
        <div className='flex  gap-2 '>Hobbies 
            {
              hobbiesArray?.map((hobby)=>{
                return<div className='px-2 py-1 rounded-lg bg-gray-200 w-fit ' >{hobby}
                <span onClick={()=>setHobbiesArray(old=>
                  old.filter((data)=> data!= hobby )
                )}className='pl-1 ml-1 text-red-600'>x</span></div>
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
          Add new Candidate</button>
          :<button onClick={onSubmit} className='bg-purple-600 px-2 py-1 rounded-md mt-8  text-gray-50'>
            Edit Candidate #{id}</button>
        }
    </div>
  );
}

export default NewCandidate