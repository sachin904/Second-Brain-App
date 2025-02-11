import { useRef, useState } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}
interface CreateContentModalProps {
  open: boolean; // State to determine if the modal is open
  onClose: () => void; // Function to close the modal
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const TitleRef = useRef<HTMLInputElement>();
  const LinkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);
  async function addContent() {

    const link = LinkRef.current?.value;
    const title = TitleRef.current?.value;

    const res=await axios.post(BACKEND_URL+"/api/v1/content", {
      link, title, type
    },
      {
        headers: {
          "Authorization": localStorage.getItem("token") || ""
        }
      });
alert(res.data.msg);
    onClose();
  }

  return <div>
    {open && <div className="h-screen w-screen fixed top-0 left-0 bg-slate-300 bg-opacity-60 flex justify-center">
      <div className="flex-col justify-center bg-white rounded-md w-56 m-auto p-4 ">
        <div className="flex justify-end">
          <span>
            <div onClick={onClose}>
              <CrossIcon />
            </div>
          </span>
        </div>
        <div>
          <Input reference={TitleRef} placeholder="Title" />
          <Input reference={LinkRef} placeholder="Link" />
          <div className="flex justify-center m-2 gap-1">
            <Button size="sm" text="youtube" onClick={() => setType(ContentType.Youtube)} variant={type === ContentType.Youtube ? "primary" : "secondary"} ></Button>
            <Button size="sm" text="twitter" onClick={() => setType(ContentType.Twitter)} variant={type === ContentType.Twitter ? "primary" : "secondary"} ></Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={addContent} variant="secondary" size="md" text="Add Content" /></div>
      </div>
    </div>}
  </div>

}
