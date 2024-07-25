import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

function ProtectedRoute() {
	const { authIsReady, user } = useAuthContext()
	if (!authIsReady) return <div>Loading...</div>
	return user ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute
