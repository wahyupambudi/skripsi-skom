import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      {/* nav */}
      {/* <nav id="navbar-main" class="navbar is-fixed-top">
        <div class="navbar-brand">
          <a class="navbar-item is-hidden-desktop jb-aside-mobile-toggle">
            <span class="icon">
              <i class="mdi mdi-forwardburger mdi-24px"></i>
            </span>
          </a>
        </div>
        <div class="navbar-brand is-right">
          <a
            class="navbar-item is-hidden-desktop jb-navbar-menu-toggle"
            data-target="navbar-menu"
          >
            <span class="icon">
              <i class="mdi mdi-dots-vertical"></i>
            </span>
          </a>
        </div>
        <div class="navbar-menu fadeIn animated faster" id="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item has-dropdown has-dropdown-with-icons has-divider is-hoverable">
              <a class="navbar-link is-arrowless">
                <span class="icon">
                  <i class="mdi mdi-menu"></i>
                </span>
                <span>Sample Menu</span>
                <span class="icon">
                  <i class="mdi mdi-chevron-down"></i>
                </span>
              </a>
              <div class="navbar-dropdown">
                <a href="profile.html" class="navbar-item">
                  <span class="icon">
                    <i class="mdi mdi-account"></i>
                  </span>
                  <span>My Profile</span>
                </a>
                <a class="navbar-item">
                  <span class="icon">
                    <i class="mdi mdi-settings"></i>
                  </span>
                  <span>Settings</span>
                </a>
                <a class="navbar-item">
                  <span class="icon">
                    <i class="mdi mdi-email"></i>
                  </span>
                  <span>Messages</span>
                </a>
                <hr class="navbar-divider" />
                <a class="navbar-item">
                  <span class="icon">
                    <i class="mdi mdi-logout"></i>
                  </span>
                  <span>Log Out</span>
                </a>
              </div>
            </div>
            <div class="navbar-item has-dropdown has-dropdown-with-icons has-divider has-user-avatar is-hoverable">
              <a class="navbar-link is-arrowless">
                <div class="is-user-avatar">
                  <img
                    src="https://avatars.dicebear.com/v2/initials/john-doe.svg"
                    alt="John Doe"
                  />
                </div>
                <div class="is-user-name">
                  <span>John Doe</span>
                </div>
                <span class="icon">
                  <i class="mdi mdi-chevron-down"></i>
                </span>
              </a>
              <div class="navbar-dropdown">
                <a href="profile.html" class="navbar-item">
                  <span class="icon">
                    <i class="mdi mdi-account"></i>
                  </span>
                  <span>My Profile</span>
                </a>
                <a class="navbar-item">
                  <span class="icon">
                    <i class="mdi mdi-settings"></i>
                  </span>
                  <span>Settings</span>
                </a>
                <a class="navbar-item">
                  <span class="icon">
                    <i class="mdi mdi-email"></i>
                  </span>
                  <span>Messages</span>
                </a>
                <hr class="navbar-divider" />
                <a class="navbar-item">
                  <span class="icon">
                    <i class="mdi mdi-logout"></i>
                  </span>
                  <span>Log Out</span>
                </a>
              </div>
            </div>
            <a
              href="https://justboil.me/bulma-admin-template/free-html-dashboard/"
              title="About"
              class="navbar-item has-divider is-desktop-icon-only"
            >
              <span class="icon">
                <i class="mdi mdi-help-circle-outline"></i>
              </span>
              <span>About</span>
            </a>
            <a title="Log out" class="navbar-item is-desktop-icon-only">
              <span class="icon">
                <i class="mdi mdi-logout"></i>
              </span>
              <span>Log out</span>
            </a>
          </div>
        </div>
      </nav> */}

      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            <img src={logo} width="112" height="28" alt="logo" />
          </NavLink>

          <a
            href="!#"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={logout} className="button is-light">
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
