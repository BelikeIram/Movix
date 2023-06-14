import React from 'react'
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import './circleRating.scss'



const CircleRating = ({rating}) => {
  return (
   <div className='circleRating'>
   <CircularProgressbar
   value={rating}
   maxValue={10}
   text={rating}
   styles={buildStyles({
      pathColor:rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
      x : 25,
      y:30
   })}
>
<text className='CircularProgressbar-text'
x={'30'}
y={'60'}
></text>
</CircularProgressbar>
   </div>   
  )
}

export default CircleRating