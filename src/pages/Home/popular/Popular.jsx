import React,{useState} from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/SwitchTabs/SwitchTabs'
import '../Home.scss'
import useFetch from '../../../Hooks/hook'
import Carousel from '../../../components/carousel/Carousel'

const Popular = () => {

    const [endPoint, setEndPoint] = useState('movie')

    const {data, loading } = useFetch(`/${endPoint}/popular`)

    const onTabChange = (tab)=>{
        setEndPoint(tab === 'TV Shows' ? 'tv' : 'movie')
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
           <span className='carouselTitle'>
              What's Popular
           </span>
           <SwitchTabs onTabChange={onTabChange} data={['Movies ','TV Shows']}/>

        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endPoint={endPoint}/>
    </div>
  )
}

export default Popular;