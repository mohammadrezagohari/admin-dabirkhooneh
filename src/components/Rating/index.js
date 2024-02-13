import React, { useState } from 'react'

function Rating() {
  const [rating,setRating]=useState(null)
  return (
    <>
       <div className="rating">
          
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        </div>
        {/* <div className="rating">
          {[...Array(5)].map((star,i)=>{
            const currentRating=i+1
              return(
                <input 
                onClick={()=>setRating(currentRating)}
                 value={currentRating}
                  type="radio" name="rating-2"
                  
                  className={`mask mask-star-2 ${currentRating<=rating?"":"bg-orange-400"} `} />
              )
          })}
            
        </div> */}
    </>
  )
}

export default Rating