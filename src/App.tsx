import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
	
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<RootLayout />}>
				<Route index element={<Login />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />

        {/* Protected Routes */}
				<Route path='/home' element={<ProtectedRoute />}>
					<Route index element={<Home />} />
				</Route>
			</Route>
		)
	)
	return <RouterProvider router={router} />
}

export default App
