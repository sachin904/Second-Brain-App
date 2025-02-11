/* eslint-disable @typescript-eslint/no-explicit-any */
interface Inputprops{
    placeholder:string
    onChange?:()=>void;
    reference?:any;
   
}
export function Input({placeholder,reference}:Inputprops){
    return<>
    <input ref={reference}  placeholder={placeholder}  className="h-10 w-full border-gray-100 border-2 rounded my-3 outline-blue-100">
        
    </input>
    </>
}