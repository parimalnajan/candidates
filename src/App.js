import logo from './logo.svg';
import './App.css';
import ProfileCard from './components/ProfileCard';
import AppRoutes from './AppRoutes';
import { createContext, useState } from 'react';
export const AuthContext= createContext()

function App() {


const [userData,setUserData] = useState()
  return (
  <AuthContext.Provider value={{userData,setUserData}}>
    <div className="App flex flex-col">
    <AppRoutes/>
    </div>
  </AuthContext.Provider>

  );
}

export default App;
