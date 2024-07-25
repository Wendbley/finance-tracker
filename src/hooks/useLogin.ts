import { useState, useEffect } from 'react'
import { authenticate } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'

export const useLogin = () => {
	const [isCancelled, setIsCancelled] = useState(false)
	const [error, setError] = useState(new Error())
	const [isPending, setIsPending] = useState(false)
	const { dispatch } = useAuthContext() as { dispatch: React.Dispatch<any> }

	const login = async (email: string, password: string) => {
		setError(new Error())
		setIsPending(true)

		try {
			// login
			const res: UserCredential = await signInWithEmailAndPassword(
				authenticate,
				email,
				password
			)

			// dispatch login action
			dispatch({ type: 'LOGIN', payload: res.user })

			if (!isCancelled) {
				setIsPending(false)
				setError(new Error())
			}
		} catch (err) {
			if (!isCancelled) {
				setIsPending(false)
			}
			if (err instanceof Error) {
				setError(err)
				setIsPending(false)
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true)
	}, [])

	return { login, isPending, error }
}
