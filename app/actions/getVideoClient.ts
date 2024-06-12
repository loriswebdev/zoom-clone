import { tokenProvider } from '@/app/actions/stream.action';
import { StreamVideoClient, User } from '@stream-io/video-react-sdk';

import {currentUser} from './getCurrentUser'

export const user: User = {
  id: '',
};
async function loadUser (){
  const userLoaded = await currentUser
  userLoaded ? user.id = userLoaded.id: user.id = ''
}
loadUser()
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY? process.env.NEXT_PUBLIC_STREAM_API_KEY: '';
export const client = new StreamVideoClient({ apiKey, tokenProvider, user });