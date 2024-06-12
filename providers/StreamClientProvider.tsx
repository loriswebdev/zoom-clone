'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { StreamVideoClient, StreamVideo, User } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { tokenProvider } from '@/app/actions/stream.action';
import Loader from '@/components/Loader';

import { fetchGetStreamData, fetchGetStreamRecordings } from '@/app/redux/calls/getStreamDataSlice';
import { useDispatch, useSelector } from "react-redux";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

  const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const getStreamData =  useSelector((state)=> state.getStreamData)
    const dispatch = useDispatch()
    const { user } = useUser();
    const streamUser:User = {
      id: `${user?.id}`,
      name: `${user?.username}` || `${user?.id}`,
      image: `${user?.imageUrl}`,
    }
    useEffect(()=>{
      console.log(user)
      if(user){
        dispatch(fetchGetStreamData(streamUser))
      }
      
    },[user])
    useMemo(()=>{
      
      if(getStreamData.calls.length > 0){
        console.log('here')
        dispatch(fetchGetStreamRecordings(getStreamData.calls))
      }
    }, [getStreamData.calls])
   

    if (!getStreamData.client) return <Loader />;

    return<StreamVideo client={getStreamData.client}>{children}</StreamVideo>
  };

  export default StreamVideoProvider;