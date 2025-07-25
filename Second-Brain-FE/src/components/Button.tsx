import { ReactElement } from "react";


interface ButtonProps{
  variant:"primary"|"secondary";
  size?:string;
  text:string;
  startIcon?:ReactElement;
  endIcon?:ReactElement;
  onClick?:()=>void;
  loading?:boolean;
}
const variantStyle={
   "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600 "
}


 
const defaultStyle="px-4 py-2 rounded-md font-light text-lg flex justify-center "
export function Button(props:ButtonProps){
    
    return<><button onClick={props.onClick} className={` text-center ${defaultStyle} ${variantStyle[props.variant]}  w-${props.size} ${props.loading?"opacity-45":""} `} disabled={props.loading} ><div className="pr-2" >{props.startIcon}</div>{props.text}
    </button></>
}


