import { Link } from "react-router-dom";
import { useRef } from "react";

const Navbar = () => {
  const toggleNavButton = useRef(null);

  const toggleNavbar = () => {
    const buttonElement = toggleNavButton.current;
    if (!buttonElement.classList.contains('active')) {
      buttonElement.classList.add('active');
    } else {
      // If it's already active, remove the 'active' class
      buttonElement.classList.remove('active');
    }

  }
  return (
    <div className="nav-wrapper">
      <nav>
        <div className="toggle-navbar" ref={toggleNavButton}>
          <div
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            <Link to="/">Home</Link>
          </div>
          <div
            className={`nav-item ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            <Link to="/about">About Us</Link>
          </div>
          <div className="nav-item">
            <Link to="/tasks">Tasks</Link>
          </div>
        </div>
        <div className="nav-left">
          <div className="logo-container">
            <Link to="/">
              <img src="https://icons.iconarchive.com/icons/gartoon-team/gartoon-apps/512/gtodo-todo-list-icon.png"></img>
              </Link>
          </div>
          <div
            className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          >
            <Link to="/">Home</Link>
          </div>
          <div
            className={`nav-item ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            <Link to="/about">About Us</Link>
          </div>
          <div  className={`nav-item ${
              location.pathname === "/tasks" ? "active" : ""
            }`}>
            <Link to="/tasks">Tasks</Link>
          </div>
        </div>
        <div className="nav-right">
          <div className="toggle-nav">
            <button  onClick={toggleNavbar}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
