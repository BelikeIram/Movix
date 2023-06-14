import React,{useState} from 'react'
import './Videos.scss'
import Img from '../../../components/lazyloaderImg/Img'
import { PlayIcon } from '../playBtn'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import VideoPopup from '../../../components/VideoPopup/VideoPopup'

const VideosSection = ({data,loading}) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

  return (
    <div className='videosSection'>
       <ContentWrapper>
       <div className='sectionHeading'>
       Videos Section
   </div>
   {!loading?(
      <div className='videos'>
         {data?.map((item)=>{
             return(
                 <div 
                 className='videoItem'
                 onClick={()=>{
                     setShow(true)
                     setVideoId(item?.key)
                 }}
                 key={item?.key}
                 >
                    <div className='videoThumbnail'>
                        <Img src={`https://img.youtube.com/vi/${item?.key}/mqdefault.jpg`}/>
                        <PlayIcon/>
                    </div>
                    <div className="videoTitle">{item?.name}</div>
                 </div>
             )
         })}
      </div>
   ):(
       <div className='videoSkeleton'>
       {loadingSkeleton()}
       {loadingSkeleton()}
       {loadingSkeleton()}
       {loadingSkeleton()}
       {loadingSkeleton()}
       </div>
   )}
       </ContentWrapper>
       <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
    </div>

  )
}

export default VideosSection