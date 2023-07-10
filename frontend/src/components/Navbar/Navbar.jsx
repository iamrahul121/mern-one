import React, { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const ShowHideMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="navbar-section">
      <div className="left-nav">
        <div className="logo">
          <h2 onClick={() => navigate("/")}>TechyFame</h2>
        </div>
      </div>
      <div className="right-nav">
        <ul className={menu ? "list-items" : "list-items menuHide"}>
          <li>
            <Link to="/" onClick={() => setMenu(!menu)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenu(!menu)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenu(!menu)}>
              Contact
            </Link>
          </li>

          {state ? (
            <>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMenu(!menu)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setMenu(!menu)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="menu">
          <i
            className={
              menu
                ? "fa-solid fa-xmark menu-icon"
                : "fa-solid fa-bars menu-icon"
            }
            onClick={ShowHideMenu}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
