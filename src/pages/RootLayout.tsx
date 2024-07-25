import { Outlet, redirect } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext'

function RootLayout() {
	const {  authIsReady } = useAuthContext()
	
	if (authIsReady) redirect('/home')
	
	return (
		<div className='App'>
			<Navbar />
			<Outlet />
		</div>
	)
}

export default RootLayout
