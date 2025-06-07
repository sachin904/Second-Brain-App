import imgsrc from "../icons/brain.png"
export function Header(){
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
</div>




    </div>
   </> 
}