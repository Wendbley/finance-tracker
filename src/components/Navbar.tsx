import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import Logo from '../assets/logo.png'

// styles
import styles from './Navbar.module.css'
import { User } from 'firebase/auth'
import { useEffect } from 'react'

export default function Navbar() {
	const redirect = useNavigate()
	const { logout } = useLogout()
	const { user } = useAuthContext() as { user: User }

	useEffect(() => {
		if (!user) {
			redirect('/')
		}
	}, [user, redirect])

	return (
		<nav className={styles.navbar}>
			<ul>
				<Link to='/' className={styles.title}>
					<img src={Logo} alt='logo' className={styles.logo} />
					myMoney
				</Link>

				{!user && (
					<>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/register'>Signup</Link>
						</li>
					</>
				)}

				{user && (
					<>
						<li>Hello, {user.displayName}</li>
						<li>
							<button className='btn' onClick={logout}>
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}
