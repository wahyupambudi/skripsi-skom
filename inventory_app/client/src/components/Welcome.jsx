import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="has-aside-left has-aside-mobile-transition has-navbar-fixed-top has-aside-expanded">
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Welcome</title>

      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css?family=Nunito"
        rel="stylesheet"
        type="text/css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"
      />

      <section className="section is-title-bar">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <ul>
                <li>Admin</li>
                <li>Dashboard</li>
              </ul>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <div className="buttons is-right">
                <a
                  href="https://github.com/vikdiesel/admin-one-bulma-dashboard"
                  target="_blank"
                  className="button is-primary"
                >
                  <span className="icon">
                    <i className="mdi mdi-github-circle"></i>
                  </span>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="hero is-hero-bar">
        <div className="hero-body">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <h1 className="title">Dashboard</h1>
              </div>
            </div>
          </div>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <h2 className="subtitle">
                  Welcome Back{" "}
                  {/* <strong>{user.user.role + " " + user.user.name}</strong> */}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
    </div>
  );
};

export default Welcome;
