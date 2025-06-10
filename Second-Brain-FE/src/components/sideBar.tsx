
import { HeaderStartIcon } from '../icons/HeaderStartIcon'
import { TwritterIcon } from '../icons/TwitterIcons'
import { YoutubeIcon } from '../icons/YoutubeIcon'
import { LinkIcon } from '../icons/LinksIcon'

import { BrainIcon } from '../icons/BrainIcon'

interface SideBarProps {
  onFilterChange: (filter: string | null) => void;  // ✅ Add this
}
import { SidebarItem } from '../components/SidebarItem'
import { ResetIcon } from '../icons/ResetIcon'
export function SideBar({onFilterChange}:SideBarProps){
    return <div className=' sm:w-[20%] bg-white p-2 h-screen shadow-gray-400 shadow-md'>
     <div className=''> <SidebarItem startIcon={<BrainIcon/>} Title='Second Brain' size={"lg"}/></div>
       
       <br/>
       <SidebarItem startIcon={<TwritterIcon/>} Title='Tweets' size={"sm"} onClick={() => onFilterChange("twitter")}/>
       <SidebarItem startIcon={<YoutubeIcon/>} Title='Videos' size={"sm"} onClick={() => onFilterChange("youtube")}/>
       <SidebarItem startIcon={<HeaderStartIcon/>} Title='Documents' size={"sm"} onClick={() => onFilterChange("document")}/>
       <SidebarItem startIcon={<LinkIcon/>} Title='Links' size={"sm"} onClick={() => onFilterChange("Link")} />
       <SidebarItem startIcon={<ResetIcon/>} Title='Reset' size={"sm"} onClick={() => onFilterChange(null)}/>
       
    </div>
   }