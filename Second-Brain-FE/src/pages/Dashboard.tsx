import { useState } from "react";
import { MainContent } from "../components/MainComponent";
import { SideBar } from "../components/sideBar";



export function DashBoard() {
  const [filter,setFilter]=useState<string|null>(null);
  return (
    <div className="flex  w-screen">
      <SideBar onFilterChange={setFilter} />
      <MainContent  filter={filter}/>
    </div>
  );
}


   
  
 
  
  
  
  
  
  
  