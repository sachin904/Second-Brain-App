/* eslint-disable @typescript-eslint/no-explicit-any */
interface Inputprops{
    placeholder:string
    onChange?:()=>void;
    reference?:any;
    type?:string;
    style?:string;
   
}
export function Input({placeholder,reference,type,style}:Inputprops){
    return<>
    <input type={type} ref={reference}  placeholder={placeholder}  className={`h-10 w-full  border-gray-100 border-2 rounded my-3 outline-blue-100 ${style}`} >
        
    </input>
    </>
}