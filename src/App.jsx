import Navbar from "./components/Navbar";
import FilterComponent from "./components/FilterComponent";
import {createContext, useEffect, useState} from 'react'
import WelcomePage from "./components/WelcomePage";

export const Context = createContext();

export default function App() {
  const [isTaskModified,setIsTaskModified] = useState(false)
  const [isLogedIn, setIsLogedIn] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('jwtToken')){
      setIsLogedIn(true)
    }
  },[])
  
  return (
    <Context.Provider value={{isTaskModified,setIsTaskModified,isLogedIn,setIsLogedIn}}>
      <Navbar />
      {
      isLogedIn?<FilterComponent />: 
      <WelcomePage/>
      }
    </Context.Provider>
  );
}