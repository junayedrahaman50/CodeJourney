import { LogOut } from "lucide-react";
import logo from "./images/logo5-edited.png";
import { Link } from "react-router-dom";
const Navbar = ({ userProfile, handleLogout }) => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="logo">
          {/* <span>Code</span>Journey */}
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul>
          <Link className="link" to="/">
            <li className="home">Home</li>
          </Link>
          <li className="greeting">{userProfile.name}</li>
          <li className="user">{userProfile.firstName}</li>
          <li onClick={handleLogout} className="logout">
            Logout
          </li>
          <li onClick={handleLogout} className="logout-mobile">
            <LogOut />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
