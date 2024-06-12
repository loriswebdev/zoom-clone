'use client'

import React, { useEffect, useState } from 'react'
import Clock from 'react-live-clock'; 

const TimeNow = () => {
   
  function getTime(now: Date){
    return    now.toLocaleTimeString('en-US',{hour: '2-digit', minute:'2-digit'})
   }
 const [time, setTime] = useState(getTime(new Date()))
 
useEffect(() => {
 const intervalTime = setInterval(()=>{
  setTime(getTime(new Date( )))
 }, 900)


 return () => {
  clearInterval(intervalTime)

 }
}, [])
  return (
 
    <h1 className='text-4xl font-extrabold lg:text-7xl'>
    {time}
    </h1>

  )
}

export default TimeNow