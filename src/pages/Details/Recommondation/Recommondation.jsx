import React from 'react'
import useFetch from '../../../Hooks/hook'
import Carousel from '../../../components/carousel/Carousel'

const Recommondation = ({mediaType,id}) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );
  return (
   <Carousel 
      title='Recommendations'
      data={data?.results}
      loading={loading}
      endPoint={mediaType}
   />
  )
}

export default Recommondation