import React from 'react'
import DetailsBanner from './detailsBanner/DetailsBanner'
import useFetch from '../../Hooks/hook'
import { useParams } from 'react-router'
import Cast from './cast/Cast'
import VideosSection from './VideosSection/VideosSection'
import Recommondation from './Recommondation/Recommondation'
import Similar from './Similar/Similar'

const Details = () => {
  const {mediaType,id} = useParams()
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits, loading:creditLoading} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <>
      <DetailsBanner video={data?.results?.[0]} loading={loading} crew={credits?.crew} crewLoading={creditLoading} />
      <Cast cast={credits?.cast} loading={creditLoading}/>
      <VideosSection data={data?.results} loading={loading}/>
      <Recommondation mediaType={mediaType} id={id}/>
    </>
  )
}

export default Details