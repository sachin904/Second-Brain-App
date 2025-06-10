import { ReactElement } from 'react';
const sizeStyle={
    "sm":"size-sm",
    "lg":"size-lg  font-bold"
  }
export function SidebarItem(props:sidebarPops){
    return<div  onClick={props.onClick} className={`${sizeStyle[props.size]} flex justify-start gap-1 mb-2 cursor-pointer hover:bg-gray-200 transition-all duration-300`}>
        <div>
          {props.startIcon}
        </div>
        <div className='hidden sm:block'>
          <p>{props.Title}</p>
        </div>
    </div>
  }
  interface sidebarPops{
    startIcon:ReactElement;
    Title:string;
    size:"sm"|"lg";
    onClick?: () => void;
  }