import { useNavigate } from "react-router-dom";
import imgsrc from "../icons/brain.png"
import { Button } from "./Button";
import { LogoutIcon } from "../icons/LogoutIcon";
export function Header(){
const navigate=useNavigate();
  const token = localStorage.getItem("token");
   const handleLogout = () => {
    localStorage.removeItem("token");
      navigate("/secondBrain/signin"); // or use navigation if using React Router
  };
   return<>
     <div id="header" className="w-screen h-12 bg-blue-500 flex justify-center items-center">
<div className="flex items-center gap-1">
  <div>
    <img src={imgsrc} className="h-6" alt="Second Brain Logo" />
  </div>
  <div className="flex text-2xl font-semibold">
    <p className="text-white">Second</p>
    <p className="text-white">Brain</p>
  </div>

      {token && token !== "undefined" && (
        <div className="absolute right-4">
        <Button
          variant="primary"
          
          text="Logout"
          onClick={handleLogout}
          startIcon={<LogoutIcon/>}
        />
        </div>
           )}
</div>




    </div>
   </> 
}