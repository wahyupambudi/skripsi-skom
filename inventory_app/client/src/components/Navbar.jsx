import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
// import "./nav.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const [isActive, setisActive] = React.useState(false);

  return (
    <div>
      <nav
        className="navbar navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              alt="Logo"
              width="112"
              height="28"
            />
          </a>

          <a
            onClick={() => {
              setisActive(!isActive);
            }}
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-start">
            <div className="navbar-item">
              <NavLink to={"/dashboard"}>
                <span className="navbar-item">Dashboard</span>
              </NavLink>
              {user && user.user.role === "admin" && (
                <NavLink to={"/users"}>
                  <span className="navbar-item">Data User</span>
                </NavLink>
              )}
              <div className="navbar-item has-dropdown has-dropdown-with-icons has-divider is-hoverable">
                <a className="navbar-link is-arrowless">
                  <span>Data Inventaris</span>
                  <span className="icon">
                    <i className="mdi mdi-chevron-down"></i>
                  </span>
                </a>
                <div className="navbar-dropdown">
                  <NavLink to={"/products"}>
                    <span className="navbar-item">
                      <span className="icon ">
                        <i className="mdi mdi-table"></i>
                      </span>
                      Data Barang
                    </span>
                  </NavLink>
                  <NavLink to={"/bhp"}>
                    <span className="navbar-item">
                      <span className="icon ">
                        <i className="mdi mdi-table"></i>
                      </span>
                      Data Barang Habis Pakai
                    </span>
                  </NavLink>
                  <NavLink to={"/services"}>
                    <span className="navbar-item">
                      <span className="icon ">
                        <i className="mdi mdi-settings"></i>
                      </span>
                      Data Service
                    </span>
                  </NavLink>
                  <hr className="navbar-divider" />
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={logout} className="button is-danger">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
