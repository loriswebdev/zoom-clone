
import { Call, CallRecording, StreamVideoClient, User, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tokenProvider } from '@/app/actions/stream.action';
const initialState:{
  calls: Call[],
  upcomingCalls: Call[],
  endedCalls: Call[],
  loading: boolean,
  recordingsLoading: boolean,
  recordingsRejected: boolean,
  recordings: CallRecording[],
  client: StreamVideoClient| null,
  user: User|null,
} = {
  calls: [],
  upcomingCalls: [],
  endedCalls: [],
  recordings: [],
  client:null,
  user: null,
  loading: false,
  recordingsLoading: false,
  recordingsRejected: false
  }
export const fetchGetStreamRecordings = createAsyncThunk('calls/fetchGetStreamRecordings', async (calls: Call[])=>{const callData = await Promise.all(calls?.map((meeting) => meeting.queryRecordings()) ?? [])
  const recordings = callData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings);
return recordings})
export const fetchGetStreamData = createAsyncThunk('calls/fetchGetStreamData', async (user: User)=>{
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;  
if(!apiKey) throw Error( "Api key required")
if (!user) throw Error('Client or user required!');
const client = new StreamVideoClient({apiKey, user, tokenProvider});
  if (!client || !user?.id) throw Error('Client or user required!');
  const { calls } = await client.queryCalls({
    sort: [{ field: 'starts_at', direction: -1 }],
    filter_conditions: {
      starts_at: { $exists: true },
      $or: [
        { created_by_user_id: user.id },
        { members: { $in: [user.id] } },
      ],
    },
  })
  const now = new Date();
  const endedCalls =calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt
  })
  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now
  })
 

  return {calls, client, user, upcomingCalls, endedCalls};
})
const getStreamDataSlice = createSlice({
  name: 'getStreamData',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchGetStreamData.pending, state => {
      state.loading = true;
    }).addCase(fetchGetStreamData.fulfilled, (state, action) => {
      state.loading = false;
      state.calls = action.payload.calls
      state.client = action.payload.client
      state.user = action.payload.user
      state.recordings= action.payload.recordings
      state.upcomingCalls = action.payload.upcomingCalls
      state.endedCalls = action.payload.endedCalls
    }).addCase(fetchGetStreamData.rejected, (state) => {
      state.loading = false;
      state.calls = [];
    }).addCase(fetchGetStreamRecordings.pending, (state)=>{
      state.recordingsLoading = true
      state.recordingsRejected = false
    }).addCase(fetchGetStreamRecordings.fulfilled, (state, action)=>{
      state.recordingsLoading = false
      state.recordingsRejected = false
      state.recordings = action.payload
    }).addCase(fetchGetStreamRecordings.rejected, (state)=>{
      state.recordingsLoading = false
      state.recordingsRejected = true
    })
  },
  
})
  export default getStreamDataSlice.reducer
  export const {updateCallsEnded, updateCallsUpcoming} = getStreamDataSlice.actions