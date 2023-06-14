import React from 'react'
import './MovieCard.scss'
import Img from '../lazyloaderImg/Img'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import dayjs from 'dayjs'
import PosterFallback from '../../assets/no-poster.png'
import CircleRating from '../../components/circleRatings/CircleRating'
import Genres from '../genres/Genres'

const MovieCard = ({data,key,fromSearch }) => {
	const { url } = useSelector((state) => state.home);
	const navigate = useNavigate();
	const posterUrl = data.poster_path
	    ? url.poster + data.poster_path
	    : PosterFallback;
  return (
	<div
	key={key}
	className="movieCard"
	onClick={() =>
	    navigate(`/${data.media_type || mediaType}/${data.id}`)
	}
  >
	<div className="posterBlock">
	    <Img className="posterImg" src={posterUrl} />
	    {!fromSearch && (
		  <React.Fragment>
			<Genres data={data.genre_ids.slice(0, 2)} />
		  </React.Fragment>
	    )}
	</div>
	<div className="textBlock">
	    <span className="title">{data.title || data.name}</span>
	    <span className="date">
		  {dayjs(data.release_date).format("MMM D, YYYY")}
	    </span>
	</div>
  </div>
  )
}

export default MovieCard