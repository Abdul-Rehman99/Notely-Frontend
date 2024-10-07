import Navbar from "./components/Navbar";
import FilterComponent from "./components/FilterComponent";
import {createContext, useState} from 'react'

export const Context = createContext();

export default function App() {
  const [isTaskModified,setIsTaskModified] = useState(false)
  
  return (
    <Context.Provider value={{isTaskModified,setIsTaskModified}}>
      <Navbar />
      <FilterComponent />
    </Context.Provider>
  );
}