import React, { useContext } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../../firebase';
import { AuthContext } from '../../App';
import { useNavigate } from "react-router-dom";
import CandidatesList from './CandidatesList';
import CandidateDetails from './CandidateDetails';


const Candidates = () => {
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
    <div>
      <div className="text-xl">CandidatesList</div>
    <button className='bg-blue-500 p-2' onClick={handleLogout}>Logout</button>
    <div className='flex flex-row'>
      <div className="w-1/3 bg-slate-400"><CandidatesList/></div>
      <CandidateDetails/>
    </div>
    </div>
  )
}

export default Candidates