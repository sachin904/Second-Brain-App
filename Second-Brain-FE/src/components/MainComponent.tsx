import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/createContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import {useContent} from '../Hooks/useContent';
import axios from 'axios'
import { BACKEND_URL } from '../config'
export function MainContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const  {contents,refresh}  = useContent();
  useEffect(()=>{
    refresh();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modalOpen]);
 

  return <div className='p-2  min-h-screen w-full  bg-gray-100'>
    <CreateContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} />
    <div className='flex justify-end  gap-2 '>
      <Button onClick={async () => {
        const response = await axios.post(BACKEND_URL + "/api/v1/brain/share",
          {
            share: true
          },
          {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          });
        const link = "http://localhost:3001/api/v1/brain/" + response.data.hash;
        console.log(link);
        alert(link);
      }} startIcon={<ShareIcon />} variant='primary' size='lg' text="share" ></Button>
      <Button   onClick={() => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined") {
      alert("Please sign in first.");
      return;
    }
    setModalOpen(true);
  }}startIcon={<PlusIcon />} variant='secondary' size='lg' text="Add Content" ></Button>
    </div>
    <div className='flex gap-2  flex-wrap  '>

      {contents.map(({ type, link, title }) =>
        <Card title={title} link={link} type={type} />)}
    </div>
  </div>

}


 