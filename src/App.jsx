import Navbar from "./components/Navbar";
import FilterComponent from "./components/FilterComponent";
// import CardList from "./components/CardList";
// import NewNoteForm from "./components/NewNoteForm";
// import { useState } from "react";


export default function App() {
  return (
    <>
      <Navbar />
      <FilterComponent />
    </>
  );
}
/*
<div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
   <CardList tasks={sampleTasks.slice(0,3)} />
</div>
*/