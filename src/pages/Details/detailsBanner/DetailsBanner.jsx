import React,{useState} from 'react'
import './DetailsBanner.scss'
import useFetch from '../../../Hooks/hook'
import { useParams } from 'react-router'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/lazyloaderImg/Img'
import BackdropPoster from '../../../assets/no-poster.png'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import Genres from '../../../components/genres/Genres'
import { PlayIcon } from '../playBtn'
import VideoPopup from '../../../components/VideoPopup/VideoPopup'

const DetailsBanner = ({video, crew}) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const {mediaType, id} = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const {url} = useSelector((state)=>state.home)
    
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const Director = crew?.filter((dir)=>dir?.job === 'Director')

    const Writer = crew?.filter((c)=>c?.job === 'Writer' || c?.job === 'Screenplay' || c?.job === 'Story')

   return (
    <div className='detailsBanner'>
        {!loading ? (
            <React.Fragment>
               <div className='backdrop-img'>
                  <Img src={url.backdrop + data?.backdrop_path}/>
                  <div className='opacity-layer'></div>
               </div>
               <ContentWrapper>
               <div className='content'>
               <div className='left'>
                  {data?.backdrop_path ? (
                      <Img src={url.backdrop + data?.backdrop_path} className={'posterImg'}/>
                  ):
                  (  <Img src={BackdropPoster} className={'posterImg'}/>)
                }
                
               </div>
               <div className='right'>
                   <div className='title'>
                       {`${data?.title || data?.name} 
                       (${dayjs(data?.release_date).format('YYYY')})`}
                   </div>
                   <div className='subtitle'>
                     {`${data?.subtitle || data?.tagline}`}
                   </div>
                   <Genres genres={data?.genres}/>
                   <div className='row'>
                       <div 
                         className='playbtn'
                         onClick={()=>{
                            setShow(true)
                            setVideoId(video?.key)}}
                         >
                          <PlayIcon/>
                          <span className="text">
                          Watch Trailer
                      </span>
                       </div>
                   </div>
                   <div className='overview'>
                     <div className='heading'>Overview</div>
                     <div className='description'>{data?.overview}</div>
                   </div>
                   <div className="info">
                   {data?.status && (
                       <div className="infoItem">
                           <span className="text bold">
                               Status:{" "}
                           </span>
                           <span className="text">
                               {data?.status}
                           </span>
                       </div>
                   )}
                   {data?.release_date && (
                       <div className="infoItem">
                           <span className="text bold">
                               Release Date:{" "}
                           </span>
                           <span className="text">
                               {dayjs(
                                   data?.release_date
                               ).format("MMM D, YYYY")}
                           </span>
                       </div>
                   )}
                   {data?.runtime && (
                       <div className="infoItem">
                           <span className="text bold">
                               Runtime:{" "}
                           </span>
                           <span className="text">
                               {toHoursAndMinutes(
                                   data?.runtime
                               )}
                           </span>
                       </div>
                   )}
               </div>

               {Director?.length > 0 && (
                <div className="info">
                    <span className="text bold">
                       Director:{" "}
                    </span>
                    <span className="text">
                       {Director?.map((d,i)=>(
                           <span key={i}>
                             {d.name}
                             {Director.length -
                                1 !==
                                i && ", "}
                           </span>
                       ))}
                    </span>
                </div>
            )}


            {Writer?.length > 0 && (
                <div className="info">
                    <span className="text bold">
                       Writer:{" "}
                    </span>
                    <span className="text">
                       {Writer?.map((w,i)=>(
                           <span key={i}>
                             {w.name}
                             {Writer.length -
                                1 !==
                                i && ", "}
                           </span>
                       ))}
                       
                    </span>
                </div>
            )}
            {data?.created_by?.length > 0 && (
                <div className="info">
                    <span className="text bold">
                        Creator:{" "}
                    </span>
                    <span className="text">
                        {data?.created_by?.map(
                            (d, i) => (
                                <span key={i}>
                                    {d.name}
                                    {data
                                        ?.created_by
                                        .length -
                                        1 !==
                                        i && ", "}
                                </span>
                            )
                        )}
                    </span>
                </div>
            )}
               </div>
            </div>
            <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
               </ContentWrapper>
            </React.Fragment>
        ):
        (
            <div className="detailsBannerSkeleton">
            <ContentWrapper>
                <div className="left skeleton"></div>
                <div className="right">
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                    <div className="row skeleton"></div>
                </div>
            </ContentWrapper>
        </div>
        )
    }
    </div>
  )
}

export default DetailsBanner