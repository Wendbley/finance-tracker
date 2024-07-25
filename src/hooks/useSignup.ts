import { useState, useEffect } from 'react'
import { authenticate } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState<Error>(new Error())
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext() as { dispatch: React.Dispatch<any> }

  const signup = async (email: string, password: string, displayName: string) => {
    setError(new Error())
    setIsPending(true)
  
    try {
      // signup
      const res = await createUserWithEmailAndPassword(authenticate,email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // add display name to user
      await updateProfile(res.user, { displayName })
      //await res.user.updateProfile({ displayName })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(new Error())
      }
    } 
    catch(err) {
      if (!isCancelled && err instanceof Error) {
        setError(err)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}