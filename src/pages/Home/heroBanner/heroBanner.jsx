import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import './heroBanner.scss'
import useFetch from '../../../Hooks/hook';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyloaderImg/Img';


const HeroBanner = () => {

    const [background, setBackground] = useState('');
    const [query, setQuery] = useState('');
    const Navigate = useNavigate();
    const {url} = useSelector((state)=>state.home)
    const {data, loading} = useFetch(`/movie/upcoming`)


    useEffect(() => {
      const bg = url.backdrop + data?.results[Math.floor(Math.random()*20)].backdrop_path
      setBackground(bg)
    }, [data])
    

    const handleChanges = (event)=>{
       if(event.key === 'Enter' && query.length > 0){
          Navigate(`search/${query}`)
       }
    }

    const handleChangesBtn = (event)=>{
      if(query.length > 0){
        Navigate(`search/${query}`)
     }
    }

  return (
    <div className='heroBanner'>
    {!loading && (
        <div className="backdrop-img">
            <Img src={background} className='backdrop-img' />
        </div>
    )}
    <div className="opacity-layer"></div>
       <div className='wrapper'>
           <div className='heroBannerContent'>
               <span className='title'>Welcome</span>
               <span className='subTitle'>Millions of movies, Tv shows and people to discover</span>
               <div className='searchInput'>
               <input
                  className='input'
                  placeholder='search movies, tv shows'
                  onChange={(e)=>setQuery(e.target.value)}
                  onKeyUp={handleChanges}
               />
               <button onClick={handleChangesBtn}>search</button>
             </div>
           </div>
       </div>
    </div>
  )
}

export default HeroBanner