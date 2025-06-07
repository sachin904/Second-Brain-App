/* eslint-disable react-hooks/rules-of-hooks */

import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function SignupPage(){
   
   const UsernameRef=useRef<HTMLInputElement>(null);
   const PasswordRef=useRef<HTMLInputElement>(null);
   const navigate=useNavigate();

   async function signup(){
      
      const username=UsernameRef.current?.value;
      const password=PasswordRef.current?.value;
      const res=await axios.post(BACKEND_URL+"/api/v1/signup",{
         userName:username,
         password
      });
      console.log(res.data);
      alert(res.data.msg);
      navigate("/secondBrain/signin");
   }
   
  return (
  <div className="h-screen w-screen bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
    <div className="bg-white shadow-xl rounded-xl p-8 w-80">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>

      <div className="space-y-4">
        <Input type="text" reference={UsernameRef} placeholder="Username" />
        <Input type="password" reference={PasswordRef} placeholder="Password" />
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={signup}
          loading={false}
          variant="primary"
          size="full" 
          text="Sign Up"
        />
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <a href="/secondBrain/signin" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  </div>
);


}