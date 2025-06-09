import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { LinkIcon } from "../icons/LinksIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { BACKEND_URL } from "../config";


export function Frame(props: frameProps) {
   async function handleDelete() {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId: props.contentId },
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });

      props.onDelete();
    } catch (error) {
      console.error("failed to delete content", error);
    }
  }
  return <div className=" flex items-center w-full justify-center">
    <div className=" bg-white shadow-md border-slate-200 border-2 w-[70%]  p-2  items-center ">
      <div className=" h-[50%] m-1 flex justify-between">
        <div className="flex justify-center items-center text-sm   ">
          <div className="mr-2 text-gray-400">
            <LinkIcon />


          </div>
          <div>{props.title}</div>

        </div>
        <div className="flex justify-between text-gray-400 ">
          <a href={props.link} target="_blank"><div className="mx-2"><ShareIcon /></div>
          </a>
          <div onClick={handleDelete} className="cursor-pointer"><DeleteIcon /></div>
        </div>
      </div>
      <div className=" p-1 h-[40%] mt-1 mx-1 bg-slate-100 rounded-md">
       {props.link}
      </div>
      <div>{props.description}</div>
    </div>

  </div>
}
interface frameProps {
  title: string;
  type: "Link";
  link: string;
  description: string;
  contentId: string;
  onDelete: () => void;


}