import React, { useRef } from "react";
import './Carousel.scss'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyloaderImg/Img";
import { getApiConfiguration } from "../../store/homeSlice";
import useFetch from "../../Hooks/hook";
import  PosterFallback from '../../assets/no-poster.png'
import CircleRating from "../circleRatings/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({data,loading,endPoint,title}) => {
  const navigate = useNavigate()
  const carouselContainer = useRef()
  const {url} = useSelector((state)=>state.home)

  const skItem = () => {
    return (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    );
};

const navigation = (dir)=>{
    const container = carouselContainer.current;

    const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20) 
    
    container.scrollTo({
        left : scrollAmount,
        behaviour : 'smooth'
    })

}
  
  return (
    <div className='carousel'>
      <ContentWrapper>
         {title && <div className="title">{title}</div>}
         
         <BsFillArrowLeftCircleFill
           className="carouselLeftNav arrow"
           onClick={() => navigation("left")}
         />
         <BsFillArrowRightCircleFill
           className="carouselRighttNav arrow"
           onClick={() => navigation("right")}
         />
         {!loading ? (
            <div className="carouselItems" ref={carouselContainer}>
              {data?.map((item)=>{
                const posterUrl = item?.poster_path ? url.poster + item?.poster_path :  PosterFallback
                return (
                  <div 
                  className="carouselItem"
                  onClick={() =>
                    navigate(
                        `/${item?.media_type || endPoint}/${
                            item?.id
                        }`
                    )
                }
                  key={item.id}>
                     <div className="posterBlock">
                        <Img src={posterUrl}/>
                       
                     </div>
                     <div className="textBlock">
                        <span className="title">
                          {item?.title || item?.name}
                        </span>
                        <span className="date">
                           {dayjs(item?.release_date).format('MMM D, YYYY')}
                        </span>
                     </div> 
                  </div>
                )
              })}       
            </div>
         ) : (
          <div className="loadingSkeleton">
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
          {skItem()}
      </div>
         )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel