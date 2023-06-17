import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <nav className="header">
      <Link to="/" className="header__Link">
        <h1>Tasks Manager</h1>
      </Link>
      <ul className="header__list">
        {isAuthenticated 
        ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
                <Link to="/addTask" className="header__Link">
                    Add Task
                </Link>
            </li>
            <li>
                <Link to="/" onClick={() => logout()} >
                    Logout
                </Link>
            </li>
          </>
        ) 
        : (
          <>
            <li>
              <Link to="/login" className="header__Link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="header__Link">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
