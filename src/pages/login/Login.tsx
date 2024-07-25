import { useEffect, useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import styles from './Login.module.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { User } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login, error, isPending } = useLogin()
	const { user } = useAuthContext() as { user: User }
	const redirect = useNavigate()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		login(email, password)
	}

	useEffect(() => {
		if (user) {
			redirect('/home')
		}
	}, [user, redirect])

	return (
		<>
			<form onSubmit={handleSubmit} className={styles['login-form']}>
				<h2>Login</h2>
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
				{!isPending && <button className='btn'>Login</button>}
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
