import {configureStore} from '@reduxjs/toolkit'
import {createLogger} from 'redux-logger'
import getStreamDataReducer from './calls/getStreamDataSlice'
const logger = createLogger()
export const store = configureStore({
    reducer: {
        getStreamData: getStreamDataReducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
})      