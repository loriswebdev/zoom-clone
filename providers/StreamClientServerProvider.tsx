// 'use client';

import { ReactNode} from 'react';
import { StreamVideoClient, StreamVideo, User } from '@stream-io/video-react-sdk';


import { tokenProvider } from '@/app/actions/stream.action';
import Loader from '@/components/Loader';
import { currentUser } from '@clerk/nextjs/server';



const StreamVideoServerProvider = async ({ children }: { children: ReactNode }) => {
    const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const user = await currentUser()
if(!API_KEY) throw Error('API key required!')
if(!user) throw Error("user required!")

  

    const client = new StreamVideoClient({
  apiKey: API_KEY,
      user,
      tokenProvider,
    })




  if (!client) return <Loader />;

  return (<StreamVideo client={client}>{children}</StreamVideo>)
};

export default StreamVideoServerProvider;