import { useEffect, useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import styles from './Register.module.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { User } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [displayName, setDisplayName] = useState('')
	const { signup, isPending, error } = useSignup()
	const { user } = useAuthContext() as { user: User }
	const redirect = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		signup(email, password, displayName)
	}

	useEffect(() => {
		if (user) {
			redirect('/home')
		}
	}, [user, redirect])

	return (
		<>
			<form onSubmit={handleSubmit} className={styles['signup-form']}>
				<h2>Register</h2>
				<label>
					<span>Email:</span>
					<input
						type='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</label>
				<label>
					<span>Password:</span>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</label>
				<label>
					<span>Display name:</span>
					<input
						type='text'
						onChange={(e) => setDisplayName(e.target.value)}
						value={displayName}
					/>
				</label>
				{!isPending && <button className='btn'>Sign up</button>}
				{isPending && (
					<button className='btn' disabled>
						Loading...
					</button>
				)}
			</form>
			{error && <p className={styles.error}>{error.message.split('/')[1]}</p>}
		</>
	)
}
