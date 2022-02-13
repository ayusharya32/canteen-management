import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
    const authState = useSelector(state => state.authState)
    const { isAuthenticated, loading } = authState

    return (!loading && isAuthenticated) ? children : <Navigate to="/login" />
}

export default PrivateRoute