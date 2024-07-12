import logo from "./images/logo4.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="logo">
          {/* <span>100</span>Daysofcode */}
          <img style={{ width: "20rem" }} src={logo} alt="logo" />
        </div>
        <ul>
          <Link className="link" to="/">
            <li>Home</li>
          </Link>
          <li>Good evening, Junayed</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
