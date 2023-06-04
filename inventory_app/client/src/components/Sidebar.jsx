import React from "react";
import { NavLink } from "react-router-dom";
// import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <aside className="aside is-placed-left is-expanded">
        <div className="aside-tools">
          <div className="aside-tools-label">
            <span>
              <b>Inventory App</b>
            </span>
          </div>
        </div>
        <div className="menu is-menu-main">
          <p className="menu-label">General</p>
          <ul className="menu-list">
            <li>
              <NavLink to={"/dashboard"}>
                <span className="icon">
                  <i className="mdi mdi-home"></i>
                </span>
                <span className="menu-item-label">Dashboard</span>
              </NavLink>
            </li>
          </ul>
          <p className="menu-label">Data Inventaris</p>
          <ul className="menu-list">
            <li>
              <NavLink to={"/products"}>
                <span className="icon ">
                  <i className="mdi mdi-table"></i>
                </span>
                <span className="menu-item-label">Data Barang</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/bhp"}>
                <span className="icon ">
                  <i className="mdi mdi-table"></i>
                </span>
                <span className="menu-item-label">Barang Habis Pakai</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/services"}>
                <span className="icon ">
                  <i className="mdi mdi-settings"></i>
                </span>
                <span className="menu-item-label">Data Service</span>
              </NavLink>
            </li>
          </ul>
          {user && user.user.role === "admin" && (
            <ul className="menu-list">
              <p className="menu-label">Data User</p>

              <li>
                <NavLink to={"/users"}>
                  <span className="icon ">
                    <i className="mdi mdi-account"></i>
                  </span>
                  <span className="menu-item-label">Data User</span>
                </NavLink>
              </li>
            </ul>
          )}
          <p className="menu-label">About</p>
          <ul className="menu-list">
            <li>
              <a
                href="https://github.com/wahyupambudi"
                target="_blank"
                rel="noreferrer"
                className="has-icon"
              >
                <span className="icon">
                  <i className="mdi mdi-github-circle"></i>
                </span>
                <span className="menu-item-label">GitHub</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      {/* <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/products"}>
              <IoPricetag /> Barang
            </NavLink>
          </li>
          <li>
            <NavLink to={"/services"}>
              <IoPricetag /> Service Barang
            </NavLink>
          </li>
        </ul>
        {user && user.user.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside> */}
    </div>
  );
};

export default Sidebar;
