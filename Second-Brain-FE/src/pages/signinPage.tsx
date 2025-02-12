import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function SigninPage(){

   const UsernameRef=useRef<HTMLInputElement>(null);
   const PasswordRef=useRef<HTMLInputElement>(null);
   const navigate=useNavigate();

   async function signin(){
      const username=UsernameRef.current?.value;
      const password=PasswordRef.current?.value;

      const res =await axios.post(BACKEND_URL+"/api/v1/signin",{
         userName:username,
         password
      })
    const jwt= res.data.token;
    localStorage.setItem("token",jwt);
      alert(res.data.msg);

      navigate("/DashBoard")
   }
     
  return <div>
        <div className="h-screen w-screen fixed top-0 left-0 bg-slate-300 bg-opacity-60 flex justify-center">
              <div className="flex-col justify-center bg-white rounded-md w-56 m-auto p-8 ">
                
                 <div>
                 <Input  type="text" reference={UsernameRef} placeholder={"Username"}/>
                 <Input type="password" reference={PasswordRef} placeholder={"Password"}/>
                 </div> 
                 <div className="flex justify-center"><Button  onClick={signin} loading={false} variant="primary" size="md" text="Signin"/></div>
              </div> 
       </div>
    </div>

}