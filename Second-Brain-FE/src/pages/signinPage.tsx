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
       
       if (res.data.msg === "signed in") {
      navigate("/secondBrain/DashBoard");
    }
   }
     
return (
  <div className="h-screen w-screen bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
    <div className="bg-white shadow-xl rounded-xl p-8 w-80">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>

      <div className="space-y-4">
        <Input type="text" reference={UsernameRef} placeholder="Username" />
        <Input type="password" reference={PasswordRef} placeholder="Password" />
      </div>

      <div className="mt-6">
        <Button
          onClick={signin}
          loading={false}
          variant="primary"
          size="full"
          text="Sign In"
        />
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don’t have an account?{" "}
        <a href="/secondBrain/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  </div>
);


}