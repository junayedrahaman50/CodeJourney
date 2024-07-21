import { User2 } from "lucide-react";
import logo from "./images/logo5-edited.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="logo">
          {/* <span>Code</span>Journey */}
          <Link to="/">
            <img style={{ width: "20rem" }} src={logo} alt="logo" />
          </Link>
        </div>
        <ul>
          <Link className="link" to="/">
            <li className="home">Home</li>
          </Link>
          <li className="greeting">Good evening, Junayed</li>
          <li className="user">
            <User2 /> Junayed
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
