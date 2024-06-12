import DateNow from '@/components/DateNow';
import MeetingTypeList from '@/components/MeetingTypeList';
import TimeNow from '@/components/TimeNow';
import React from 'react'

const Home = () => {
  const now = new Date();
  

 
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
    <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'><div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
      <h2 className="glassmorphism max-w-[270px] round py-2 text-center text-base font-normal">Upcoming Meetin at: 12:30pm</h2>
      <div className="flex flex-col gap-2">
      <TimeNow />
      <DateNow />
      </div>
      </div></div>
    <MeetingTypeList/>
    </section>
  )
}

export default Home