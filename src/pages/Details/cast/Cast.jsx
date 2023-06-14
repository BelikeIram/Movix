import './Cast.scss'

import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Img from '../../../components/lazyloaderImg/Img'
import { useSelector } from 'react-redux'
import Avatar from '../../../assets/avatar.png'
const Cast = ({cast,loading}) => {

    const {url} = useSelector((state)=>state.home)

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

  return (
      <div className='castSection'>
          <ContentWrapper>
              <div className='sectionHeading'>Top Cast</div>
              {!loading ? (
                <div className='listItems'>
                   {cast?.map((item)=>{
                       const profileImg = item?.profile_path ? url.profile + item?.profile_path : Avatar
                       return(
                          <div className='listItem' key={item?.id}>
                               <div className='profileImg'>
                                   <Img src={profileImg}/>
                               </div>
                               <div className='name'>{item?.name}</div>
                               <div className='character'>{item?.character}</div>
                          </div>
                       )
                   })}
                </div>
              ):(
                <div className='castSkeleton'>
                   skeleton();
                   skeleton()
                   skeleton()
                   skeleton()
                   skeleton()
                </div>
        
              )}
          </ContentWrapper>
      </div>
  )
}

export default Cast