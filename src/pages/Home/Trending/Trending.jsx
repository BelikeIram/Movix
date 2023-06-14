import React,{useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs'
import '../Home.scss'
import useFetch from '../../../Hooks/hook'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {

    const [endPoint, setEndPoint] = useState('day')

    const {data, loading } = useFetch(`/trending/movie/${endPoint}`)

    const onTabChange = (tab)=>{
        setEndPoint(tab === 'Day' ? 'day' : 'week')
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
           <span className='carouselTitle'>
              Trending
           </span>
           <SwitchTabs onTabChange={onTabChange} data={['Day','Week']}/>
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending