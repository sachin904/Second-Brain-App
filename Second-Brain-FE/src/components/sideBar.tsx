
import { HeaderStartIcon } from '../icons/HeaderStartIcon'
import { TwritterIcon } from '../icons/TwitterIcons'
import { YoutubeIcon } from '../icons/YoutubeIcon'
import { LinkIcon } from '../icons/LinksIcon'
import { HashIcon } from '../icons/hashIcon'
import { BrainIcon } from '../icons/BrainIcon'

import { SidebarItem } from '../components/SidebarItem'
export function SideBar(){
    return <div className=' sm:w-[20%] bg-white p-2 h-screen shadow-gray-400 shadow-md'>
     <div className=''><SidebarItem startIcon={<BrainIcon/>} Title='Second Brain' size={"lg"}/></div>
       
       <br/>
       <SidebarItem startIcon={<TwritterIcon/>} Title='Tweets' size={"sm"}/>
       <SidebarItem startIcon={<YoutubeIcon/>} Title='Videos' size={"sm"}/>
       <SidebarItem startIcon={<HeaderStartIcon/>} Title='Documents' size={"sm"}/>
       <SidebarItem startIcon={<LinkIcon/>} Title='Links' size={"sm"}/>
       <SidebarItem startIcon={<HashIcon/>} Title='Tags' size={"sm"}/>
       
    </div>
   }