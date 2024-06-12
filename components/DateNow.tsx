'use client'
import React, { useEffect, useState } from 'react'

const DateNow = () => {
    function getDate(now: Date){
       return    (new Intl.DateTimeFormat('en-US', {dateStyle: 'full'})).format(now)
      }
    const [date, setDate] = useState(getDate(new Date()))
    
 useEffect(() => {
    const intervalDate = setInterval(()=>{
     setDate(getDate(new Date()))
    }, 60000*30)
 
  
    return () => {
     clearInterval(intervalDate)

    }
  }, [])
  return (

    <p className="text-lg font-medium text-sky-1 lg:text-2xl">
      {date}
    </p>

  )
}

export default DateNow