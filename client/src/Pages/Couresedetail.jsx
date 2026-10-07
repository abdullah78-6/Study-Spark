import React, { useEffect } from 'react'
import { control } from '../Redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'
import {MediaController,MediaControlBar,MediaTimeRange,MediaTimeDisplay,MediaVolumeRange,MediaPlaybackRateButton,MediaPlayButton,MediaSeekBackwardButton,MediaSeekForwardButton,MediaMuteButton,MediaFullscreenButton,} from "media-chrome/react";
const Couresedetail = ({url}) => {
    const detailcourse=useSelector(state=>state.main.detailcourse);
    const navigate=useNavigate();
    useEffect(()=>{
    if(!detailcourse.id){
            navigate("/course")
        }
    },[])
  return (
    <div>
        <Navbar url={url}/>
      <h1>Course name:{detailcourse.name}</h1>
        <img src={detailcourse.image} alt={detailcourse.name}/>
        <h1>id:{detailcourse.id}</h1>
        <h1>modules:{detailcourse.modules}</h1>
        <h1>Description:{detailcourse.description}</h1>
        <MediaController
        >
          PREVIEW OF THE COURSE
        <ReactPlayer
         src={detailcourse.demo}
         slot='media'
         controls={false}
         
         style={{
          width:"100%",
          height:"100%",
          "--controle":"none"
         }}
         />       
         
          <MediaControlBar>
        <MediaPlayButton />
        <MediaSeekBackwardButton seekOffset={10} />
        <MediaSeekForwardButton seekOffset={10} />
        <MediaTimeRange />
        <MediaTimeDisplay showDuration />
        <MediaMuteButton />
        <MediaVolumeRange />
        <MediaPlaybackRateButton />
        <MediaFullscreenButton />
      </MediaControlBar>
        </MediaController>
        {detailcourse.urls.map((i)=>(
            <div>
            
            <li >urls:{i}</li>
            </div>
        ))}
        <button className='bg-blue-800 mt-2 p-2 text-white font-bold'>ENROLL NOW</button>
    
        
        <Footer url={url}/>
    </div>
  )
}

export default Couresedetail
