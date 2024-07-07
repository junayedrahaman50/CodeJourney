import logo from "./images/logo4.png";
const Navbar = () => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="logo">
          {/* <span>100</span>Daysofcode */}
          <img style={{ width: "20rem" }} src={logo} alt="logo" />
        </div>
        <ul>
          <li>Progress</li>
          <li>Challenges</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
