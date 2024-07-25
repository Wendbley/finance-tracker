import { useEffect, useState } from 'react'
import { authenticate } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { signOut } from 'firebase/auth'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState<Error>(new Error())
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext() as { dispatch: React.Dispatch<any> }
  
  const logout = async () => {
    setError(new Error())
    setIsPending(true)

    try {
      // sign the user out
      await signOut(authenticate)
      
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
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

  return { logout, error, isPending }
}