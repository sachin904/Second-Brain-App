

import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwritterIcon } from "../icons/TwitterIcons";
import { DocumentIcon } from "../icons/DocumentIcon";
import { useEffect, useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";



export function Card(props: CardProps) {

  const twitterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Dynamically load widgets.js when the element is visible
          const script = document.createElement("script");
          script.src = "https://platform.twitter.com/widgets.js";
          script.async = true;
          document.body.appendChild(script);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (twitterRef.current) observer.observe(twitterRef.current);
    return () => observer.disconnect();
  }, []);
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
  return <div>
    <div className="bg-white shadow-md border-slate-200 border-2 p-4 rounded-md max-w-72  overflow-hidden my-10 ">
      <div className="flex justify-between">
        <div className="flex justify-center items-center text-sm   ">
          <div className="mr-2 text-gray-400">
            {props.type === "youtube" && <YoutubeIcon />}
            {props.type === "twitter" && <TwritterIcon />}
            {props.type==="document" && <DocumentIcon/>}

          </div>
          <div>{props.title}</div>

        </div>
        <div className="flex justify-between text-gray-400 ">
          <a href={props.link} target="_blank"><div className="mx-2"><ShareIcon /></div>
          </a>
          <div onClick={handleDelete} className="cursor-pointer"><DeleteIcon /></div>
        </div>
      </div>
      <div className="my-2 ">
      <div className=" w-full  text-center  rounded-md my-2 ">
        <div >
          {props.type === "youtube" && <div ref={twitterRef}><iframe className="w-full h-[150px] rounded-md" src={props.link.replace("watch", "embed").replace("?v=", "/").replace("youtu.be", "www.youtube.com/embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>}
          {props.type === "twitter" && <div ><blockquote className="twitter-tweet w-full  ">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote></div>}
          {props.type==="document" &&<div><iframe src={props.link} width="100%" height="150px"></iframe>
 </div> }
          

        </div>
      </div>
      <div>
        <div>
          <div className="flex flex-wrap gap-1 mt-2">
            {props.tags.map((tag, index) => (
              <span key={index} className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                {typeof tag === "string" ? tag : tag.title}
              </span>
            ))}
          </div>
        </div>
        <div>{props.description}</div>
      </div>
      </div>
    </div>
  </div>
}

interface CardProps {

  title: string;
  type: "youtube" | "twitter"|"document";
  link: string;
  tags: { title: string }[];
  description: string;
  contentId: string;
  onDelete: () => void;
}

