'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { StreamVideoClient, StreamVideo, User } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { tokenProvider } from '@/app/actions/stream.action';
import Loader from '@/components/Loader';

import { fetchGetStreamData, fetchGetStreamRecordings, getStreamDataStateType } from '@/app/redux/calls/getStreamDataSlice';
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from '@reduxjs/toolkit';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

  const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const getStreamData =  useSelector((state:{getStreamData:getStreamDataStateType})=> state.getStreamData)
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
        const action: unknown = fetchGetStreamData(streamUser)
        dispatch(action as UnknownAction)
      }
      
    },[user])
    useMemo(()=>{
      
      if(getStreamData.calls.length > 0){
        console.log('here')
        const action: unknown = fetchGetStreamRecordings(getStreamData.calls)
        dispatch(action as UnknownAction)
      }
    }, [getStreamData.calls])
   

    if (!getStreamData.client) return <Loader />;

    return<StreamVideo client={getStreamData.client}>{children}</StreamVideo>
  };

  export default StreamVideoProvider;