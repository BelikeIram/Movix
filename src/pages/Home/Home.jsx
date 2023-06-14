import React from 'react'
import HeroBanner from './heroBanner/heroBanner'
import Popular from './popular/Popular'
import Trending from './Trending/Trending'
import TopRated from './topRated/TopRated'

export const Home = () => {
  return (
      <div className='homePage'>
        <HeroBanner/>
        <Trending/>
        <Popular/>
        <TopRated/>
      </div>
  )
}
