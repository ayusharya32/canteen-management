import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

function Header() {
    const dispatch = useDispatch()

    function onLogoutButtonClicked() {
        dispatch(logout())
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark px-sm-5">
            <div className="container-fluid">
                <Link className="navbar-brand text-white fs-4 me-sm-5" to="/">Canteen Management</Link>
                <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/orders">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/customers">Customers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/products">Products</Link>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Ayush Arya
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><button className="dropdown-item" onClick={onLogoutButtonClicked}>Logout</button></li>
                            </ul>
                        </li>
                        
                    </ul>
                </div>
            </div>
            </nav>
            <Outlet />
        </header>
    )
}

export default Header;
