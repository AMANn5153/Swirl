import React,{useEffect, useRef, useState} from 'react'
import Portal from './Portal'
import './Swirl.css'
import Online from '../online/Online'
import Chat from '../Chat/Chat'
import logoVideo from '../../media/Logo Vedio.mp4'; 
import { useLogout } from '../../hooks/useLogout';
import { BsSend } from "react-icons/bs";
import useUserOnline from '../../hooks/useUserOnline'
import Skeleton from '../Skeleton/Skeleton';
import useGetUsers from '../../store/useGetUsers'
import Header from '../Chat/Header'
import useSendMessage from '../../hooks/useSendMessage'
import useGetMessage from '../../hooks/useGetMessage'
import useSocketMessage from '../../hooks/useSocketMessage'
import { HiChevronDoubleLeft } from "react-icons/hi";




const Swril = () => {
  const { logout} = useLogout();
  const {user, loading} = useUserOnline();
  const [message, setMessage] = useState('');
  const {loadingMessage, sendMessage} = useSendMessage();
  const {messages} = useGetMessage();
  const {selectedConversation} = useGetUsers();
  useSocketMessage();

  const handleLogout = async(e)=>{
    await logout();
  }

  const intoView = useRef();

  useEffect(()=>{
    
      intoView.current?.scrollIntoView({behavior : 'smooth'});
  
  },[messages])

  useEffect(()=>{
    if(selectedConversation){
      const con = document.getElementById('swirl-conversation');
      const out = document.getElementById('swirl-out');
      con.style.zIndex='1';
      }
      
  },[selectedConversation])


  const handleBack = ()=>{
    const con = document.getElementById('swirl-conversation');
    const out = document.getElementById('swirl-out');
      con.style.zIndex='-1';
      out.style.zIndex='1';
  }
 

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(message === '')return;
    await sendMessage(message);
    setMessage('');
  }
  
  


  return (
    <>
  <div className='relative min-h-screen'>
    <Portal/>
    <div>
      <div className="swirl-out-box overflow-hidden">
        <div id = 'swirl-out' className="swirl-out rounded overflow-y-auto">
        <div className='swirl-menu glass-effect '>
        <div className='swirl-menu-logo '>
          <div className=" flex  justify-around item-start  " data-tip="Logout">
              <video src={logoVideo} autoPlay loop muted className="  w-16 h-full rounded-full" />
          </div>
        </div>
        <div className='swirl-menu-logout'>
        <button className='tooltip tooltip-bottom' data-tip = "logout" onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
</svg>
</button>
          </div>
        </div>
        <div className='swirl-online glass-effect    '>
        {loading ? (<Skeleton/>) : (user.map((conversation)=>(
          <Online
            key = {conversation._id}
            conversation = {conversation}
          />
        )))}
        </div>
        </div>
       
        <div className='swirl-chat glass-effect   rounded overflow-y-auto  '>
        </div>
        <div id='swirl-conversation' className= 'swirl-conversation glass-effect relative rounded  flex  flex-col overflow-hidden' >
          <div  className='back' onClick={handleBack}>
              <HiChevronDoubleLeft size={40} />
            </div>
          {!selectedConversation?" ": <Header selectedConversation={selectedConversation}/>}
        <div className='flex-1 overflow-y-auto no-scrollbar mt-4'>
          {selectedConversation ?(messages.map((values, index)=>(
            <div  key={index}>
            <Chat message ={values}/>
            </div>
          ))):<video src={logoVideo} autoPlay loop muted  />  }
          <div ref={intoView}/>
        </div >
        {selectedConversation ?
        <div className=' mess h-12 m-1 relative absolute bottom-0 rounded-lg border-2 border-blue-700'>
              <textarea
                type="text"
                className="h-full w-5/6 p-3 rounded-xl bg-gray-100 focus:outline-none resize-none hidden-scrollbar"
                placeholder='Type Your Message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className='absolute h-10 inset-y-0 end-0 flex items-center pe-3' onClick = {handleSubmit}>
       					<BsSend size={20} />
			        </button>
        </div> : " "
        }
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default Swril