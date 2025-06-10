import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { Content } from "../types";

export  function useContent() {
    const[contents,setContent]=useState<Content[]>([]);
  function refresh(){
           axios.get(BACKEND_URL+"/api/v1/content",
            {
             headers:{
                "Authorization":localStorage.getItem("token")
             }
            })
            .then((response)=>{
                
                setContent(response.data.content)
            })
  }
    useEffect(()=>{
       refresh()
     const interval= setInterval(()=>{
        refresh()
      },60 * 1000);
 return ()=>{
    clearInterval(interval)
 }
    },[]);
    return {contents,refresh};
}

