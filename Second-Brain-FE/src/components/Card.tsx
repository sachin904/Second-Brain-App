

import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwritterIcon } from "../icons/TwitterIcons";
import { useEffect, useRef } from "react";


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
    return <div>
        <div className="bg-white shadow-md border-slate-200 border-2 p-4 rounded-md max-w-72 my-10 ">
        <div className="flex justify-between">
            <div className="flex justify-center items-center text-sm   ">
                <div className="mr-2 text-gray-400">
                    {props.type==="youtube"&&<YoutubeIcon/>}
                    {props.type==="twitter"&&<TwritterIcon/>}
                
                </div>
                <div>{props.title}</div>

            </div>
            <div className="flex justify-between text-gray-400 ">
                <a href={props.link} target="_blank"><div className="mx-2"><ShareIcon /></div>
                </a>
                <div><DeleteIcon /></div>
            </div>
        </div>
        <div className=" w-full  text-center  rounded-md my-2 ">
            <div >
        {props.type==="youtube"&&<div ref={twitterRef}><iframe className="w-full rounded-md" src={props.link.replace("watch","embed").replace("?v=","/").replace("youtu.be","www.youtube.com/embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>}
{props.type==="twitter" &&<div><blockquote className="twitter-tweet w-full ">
  <a href={props.link.replace("x.com","twitter.com")}></a> 
</blockquote></div>}
        
        </div>
        </div>
        <div>
            <div>
                <span className="bg-purple-100 text-purple-600">hiiiii</span>
            </div>
            <div>sjanxnabxijb</div>
        </div>
    </div>
    </div>
}

interface CardProps {

    title: string;
     type: "youtube" | "twitter";
     link:  string;

}

