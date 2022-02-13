import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import Alert from "../components/Alert";
import { ALERT_ERROR } from "../utils/Constants";

function Login() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const authState = useSelector(state => state.authState)

  const { isAuthenticated, loading, error } = authState

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onLoginFormSubmitted(e) {
    e.preventDefault()

    dispatch(loginUser(email, password))
  }

  useEffect(() => {
    if(isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated])

  return (
    <section className="login"> 
          { loading ? <Loader /> :
            <>
              <div className="container col-9 col-md-6 col-xxl-4 mt-5 border pb-3">
                { error && <Alert alertType={ALERT_ERROR} message={error.data.message} />}
                <h1 className="text-center py-3 mb-3">Canteen Management</h1>
                <form className="mb-3" onSubmit={onLoginFormSubmitted}>
                  <div className="mb-3">
                      <input 
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="email" 
                          className="form-control"
                          placeholder="Email"
                          required
                      />
                  </div>
                  <div className="mb-3">
                      <input 
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          type="password" 
                          className="form-control" 
                          placeholder="Password"
                          required
                      />
                  </div>
                  <div className="text-center py-1  d-grid gap-2">
                      <button 
                          disabled={loading}
                          type="submit" 
                          className="btn btn-primary">
                          Log In
                      </button>
                  </div>
                </form>
              </div>
              <div className="container col-9 col-md-6 col-xxl-4 my-4 py-3 border">
                  <p className="text-center">
                      Test email: ayush@gmail.com <br />
                      Test password: Test@123
                  </p>
              </div>
            </>
          }
    </section>
  );
}
  
  export default Login;
  