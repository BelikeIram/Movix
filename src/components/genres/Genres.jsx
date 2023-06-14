import React from 'react'
import './Genres.scss'
import {useSelector} from 'react-redux'

function Genres({genres}) {
    // const {genres} = useSelector((state)=>state.home)
  return (
    <div className="genres">
            {genres?.map((g,index) => {
                if (!g.name) return;
                return (
                    <div key={index} className="genre">
                        {g?.name}
                    </div>
                );
            })}
        </div>
  )
}

export default Genres