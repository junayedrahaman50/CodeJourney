import logo from "./images/logo5-edited.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="logo">
          {/* <span>Code</span>Journey */}
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
