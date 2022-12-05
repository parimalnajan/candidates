import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../../firebase';
import { AuthContext } from '../../App';
import { useNavigate,Route,Routes } from "react-router-dom";
import CandidatesList from './CandidatesList';
import CandidateDetails from './CandidateDetails';
import NewCandidate from './NewCandidate';
import { useParams } from 'react-router-dom';


export const candidateContext= createContext()
const Candidates = () => {
  const selectedId= useParams();

  const [allCandidates,setAllCandidates] = useState([])
  const [candidateNames,setCandidateNames] = useState([])

  
  useEffect(() => {
    async function getCandidates(){
    const url='https://60d5a2c2943aa60017768b01.mockapi.io/candidate'
    // Awaiting for fetch response
    const response = await fetch(url);
 
    // Awaiting for response.json()
    const resData = await response.json();

    // Returning result data
    setAllCandidates(resData) ;

     setCandidateNames(resData.reverse().map((candidate)=>{return {name:candidate.name,id:candidate.id}}))
  }
  getCandidates()
  console.log()

  }, [selectedId])
  
  const { userData, setUserData } = useContext(AuthContext);
  const navigate= useNavigate()
  const handleLogout = () =>{
    const auth = getAuth(app);
    auth.signOut()
    setUserData(auth)
    navigate("/auth");
    alert("logged out successfully")
    var isAuth = sessionStorage.setItem("isAuth","false")
    console.log("session",{isAuth})
  }
return (
  <candidateContext.Provider value={{allCandidates}}>
    <section>
    <button className='bg-blue-400 p-2 fixed right-4 top-4 rounded-md px-2 py-1' onClick={handleLogout}>Logout</button>
    <div className='flex flex-row'>
      <div className="w-1/4 h-screen overflow-scroll"><CandidatesList names={candidateNames} /></div>
      <div className="w-3/4">
      <Routes>
      <Route exact path="/new" element = {<NewCandidate isAddMode={true}/>}></Route>
      <Route exact path="/:id/edit" element = {<NewCandidate isAddMode={false}/>}></Route>
      <Route exact path="/:id" element = {<CandidateDetails allCandidates={allCandidates}/>}></Route>
      </Routes>
      </div>
    </div>
    </section>

  </candidateContext.Provider>

  )
}

export default Candidates