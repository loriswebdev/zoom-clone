'use server'
import { currentUser as retrieveUser } from "@clerk/nextjs/server"

const getUser = async()=>{
    const user = await retrieveUser()
    return user
  }
export const currentUser = getUser()
