import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const DataCount = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [countUser, setCountUsers] = useState([]);
  const [countBarang, setCountBarang] = useState([]);
  const [countBarangHP, setCountBarangHP] = useState([]);
  const [countService, setCountService] = useState([]);

  useEffect(() => {
    RefreshToken();
    getCountUsers();
    getCountBarang();
    getCountBarangHP();
    getCountService();
  }, []);

  const RefreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:2023/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        // history.push("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:2023/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getCountUsers = async () => {
    const response = await axiosJWT.get("http://localhost:2023/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setCountUsers(response.data.response.length);
  };

  const getCountBarang = async () => {
    const response = await axiosJWT.get("http://localhost:2023/barangs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setCountBarang(response.data.length);
  };

  const getCountBarangHP = async () => {
    const response = await axiosJWT.get("http://localhost:2023/bhp", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setCountBarangHP(response.data.length);
  };

  const getCountService = async () => {
    const response = await axiosJWT.get("http://localhost:2023/srv", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setCountService(response.data.length);
  };

  return (
    <div className="has-aside-left has-aside-mobile-transition has-navbar-fixed-top has-aside-expanded">
      {/* data dashboard */}
      <section>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="card tile is-child">
              <div className="card-content">
                <div className="level is-mobile">
                  <div className="level-item">
                    <div className="is-widget-label">
                      <h3 className="subtitle is-spaced">Data Barang</h3>
                      <h1 className="title">{countBarang}</h1>
                    </div>
                  </div>
                  <div className="level-item has-widget-icon">
                    <div className="is-widget-icon">
                      <span className="icon has-text-info is-large">
                        <i className="mdi mdi-database mdi-48px"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="card tile is-child">
              <div className="card-content">
                <div className="level is-mobile">
                  <div className="level-item">
                    <div className="is-widget-label">
                      <h3 className="subtitle is-spaced">Barang Habis Pakai</h3>
                      <h1 className="title">{countBarangHP}</h1>
                    </div>
                  </div>
                  <div className="level-item has-widget-icon">
                    <div className="is-widget-icon">
                      <span className="icon has-text-info is-large">
                        <i className="mdi mdi-database mdi-48px"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="card tile is-child">
              <div className="card-content">
                <div className="level is-mobile">
                  <div className="level-item">
                    <div className="is-widget-label">
                      <h3 className="subtitle is-spaced">Data Service</h3>
                      <h1 className="title">{countService}</h1>
                    </div>
                  </div>
                  <div className="level-item has-widget-icon">
                    <div className="is-widget-icon">
                      <span className="icon has-text-info is-large">
                        <i className="mdi mdi-database mdi-48px"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {user && user.user.role === "admin" && (
        <section>
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="card tile is-child">
                <div className="card-content">
                  <div className="level is-mobile">
                    <div className="level-item">
                      <div className="is-widget-label">
                        <h3 className="subtitle is-spaced">Data User</h3>
                        <h1 className="title">{countUser}</h1>
                      </div>
                    </div>
                    <div className="level-item has-widget-icon">
                      <div className="is-widget-icon">
                        <span className="icon has-text-primary is-large">
                          <i className="mdi mdi-account-multiple mdi-48px"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="card tile is-child">
                <div className="card-content">
                  <div className="level is-mobile">
                    <div className="level-item">
                      <div className="is-widget-label">
                        <h3 className="subtitle is-spaced">Data Barang</h3>
                        <h1 className="title">{countBarang}</h1>
                      </div>
                    </div>
                    <div className="level-item has-widget-icon">
                      <div className="is-widget-icon">
                        <span className="icon has-text-info is-large">
                          <i className="mdi mdi-database mdi-48px"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="card tile is-child">
                <div className="card-content">
                  <div className="level is-mobile">
                    <div className="level-item">
                      <div className="is-widget-label">
                        <h3 className="subtitle is-spaced">Performance</h3>
                        <h1 className="title">256%</h1>
                      </div>
                    </div>
                    <div className="level-item has-widget-icon">
                      <div className="is-widget-icon">
                        <span className="icon has-text-success is-large">
                          <i className="mdi mdi-finance mdi-48px"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DataCount;
