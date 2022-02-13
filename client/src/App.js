import './App.scss';
import Header from './components/Header';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import PrivateRoute from './utils/PrivateRoute';
import AddCustomer from './pages/AddCustomer';
import AddProduct from './pages/AddProduct';
import CreateOrder from './pages/CreateOrder';
import { useDispatch } from 'react-redux';
import jwtDecode from "jwt-decode"
import { logout } from './redux/actions/authActions';
import axios from 'axios';
import { KEY_AUTH_TOKEN } from './utils/Constants';
import CustomerDetails from './pages/CustomerDetails';
import OrderDetails from './pages/OrderDetails';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Orders from './pages/Orders';

function App() {
  const dispatch = useDispatch()

  const token = localStorage.getItem(KEY_AUTH_TOKEN)
  console.log(token);
  if(token) {
    const decodedToken = jwtDecode(token)

    if(decodedToken.exp * 1000 < Date.now()) {
      dispatch(logout())
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />}/>
          
          <Route path="/" element={<Header />}>
            <Route index element={<PrivateRoute> <Home /> </PrivateRoute>} />
            <Route path="customers" element={<PrivateRoute> <Customers /> </PrivateRoute>} />
            <Route path="customers/:customerId" element={<PrivateRoute> <CustomerDetails /> </PrivateRoute>} />
            <Route path="customers/add" element={<PrivateRoute> <AddCustomer /> </PrivateRoute>} />

            <Route path="products" element={<PrivateRoute> <Products /> </PrivateRoute>} />
            <Route path="products/add" element={<PrivateRoute> <AddProduct /> </PrivateRoute>} />

            <Route path="orders" element={<PrivateRoute> <Orders /> </PrivateRoute>} />
            <Route path="orders/:orderId" element={<PrivateRoute> <OrderDetails /> </PrivateRoute>} />
            <Route path="orders/add" element={<PrivateRoute> <CreateOrder /> </PrivateRoute>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
