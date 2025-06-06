import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export default function useContent() {
    const[contents,setContent]=useState([]);
  function refresh(){
    console.log("Refreshing content at", new Date().toLocaleTimeString());
        axios.get(BACKEND_URL+"/api/v1/content",
            {
             headers:{
                "Authorization":localStorage.getItem("token")
             }
            })
            .then((response)=>{
                
                setContent(response.data.content)
            });
    }
    useEffect(()=>{
      console.log("usecontent mounted")
        refresh();
      const interval=setInterval(()=>{
        console.log("interval running ");
         refresh();
      },60000);
      
      return ()=>{
        console.log("cleaning interval iin usecontent ");
        clearInterval(interval);
      };
      
    },[]);
    return {contents,refresh};
}

