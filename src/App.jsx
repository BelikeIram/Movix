import { useState, useEffect } from 'react'
import { fetchDataFromApi } from './utils/api'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'
import { Home, Details, NoResult, Explore, SearchResults } from './pages'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import './App.scss'

function App() {
  const [check, setcheck] = useState({})
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    apiTesting()
    genreCall()
  }, [])

  const apiTesting = () => {fetchDataFromApi('/configuration')
  .then((res)=>{
    setcheck(res)
    const url = {
       backdrop : res.images.secure_base_url + 'original',
       poster : res.images.secure_base_url + 'original',
       profile: res.images.secure_base_url + 'original'
    }
    dispatch(getApiConfiguration(url))
  }
  )
}

const genreCall = async ()=>{
  let promises = [];
  let endpoints = ['tv','movie']
  let allGenres = {};

  endpoints.forEach((item)=>{
    promises.push(fetchDataFromApi(`/genre/${item}/list`))
  })

  const data = await Promise.all(promises)
  data.map(({ genres }) => {
    return genres.map((item) => (allGenres[item.id] = item));
});

}
  return (
    <>
      <BrowserRouter>
        <Header/>
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/:mediaType/:id' element={<Details/>}/>
            <Route path='/search/:query' element={<SearchResults/>}/>
            <Route path='/explore/:mediaType' element={<Explore/>}/>
            <Route path='*' element={<NoResult/>}/>
         </Routes>
         <Footer/> 
      </BrowserRouter> 
    </>
  )
}

export default App
