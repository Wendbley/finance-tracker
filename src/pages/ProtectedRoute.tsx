import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

function ProtectedRoute() {
	const { authIsReady, user } = useAuthContext()
	if (!authIsReady) return <div className='loading'>Loading...</div>
	return user ? <Outlet /> : <Navigate to='/login' replace={true} />
}

export default ProtectedRoute
