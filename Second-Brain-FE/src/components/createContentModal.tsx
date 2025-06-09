import { useRef, useState } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Document = "document",
  Link= "Link",
}
interface CreateContentModalProps {
  open: boolean; // State to determine if the modal is open
  onClose: () => void; // Function to close the modal
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const TitleRef = useRef<HTMLInputElement>(null);
  const LinkRef = useRef<HTMLInputElement>(null);
  const TagRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  async function addContent() {

    const link = LinkRef.current?.value;
    const title = TitleRef.current?.value;
    const tags=TagRef.current?.value;
    const description=descriptionRef.current?.value;
    const res=await axios.post(BACKEND_URL+"/api/v1/content", {
      link, title, type, tags,description
    },
      {
        headers: {
          "Authorization": localStorage.getItem("token") || ""
        }
      });
alert(res.data.msg);
    onClose();
  }

 return (
  <div>
    {open && (
      <div className="fixed inset-0 bg-slate-300 bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-80 p-6 shadow-xl">
          {/* Close Button */}
          <div className="flex justify-end mb-2">
            <button onClick={onClose} className="hover:text-red-500 transition">
              <CrossIcon />
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-3">
            <Input reference={TitleRef} placeholder="Title" />
            <Input reference={LinkRef} placeholder="Link" />
            <Input reference={TagRef} placeholder="Tags (comma separated)" />
            <Input
              reference={descriptionRef}
              placeholder="Brief description"
              style="h-20 resize-none" // double height
            />
          </div>

          {/* Type Selector */}
          <div className="flex justify-center mt-4 gap-2 flex-wrap">
            <Button
              text="YouTube"
              onClick={() => setType(ContentType.Youtube)}
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
            />
            <Button
              text="Twitter"
              onClick={() => setType(ContentType.Twitter)}
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
            />
            <Button
              text="Document"
              onClick={() => setType(ContentType.Document)}
              variant={type === ContentType.Document ? "primary" : "secondary"}
            />
            <Button
              text="Link"
              onClick={() => setType(ContentType.Link)}
              variant={type === ContentType.Link ? "primary" : "secondary"}
            />
          </div>

          {/* Add Content Button */}
          <div className="flex justify-center mt-4">
            <Button
              onClick={addContent}
              variant="secondary"
              text="Add Content"
              size="full"
            />
          </div>
        </div>
      </div>
    )}
  </div>
);


}
