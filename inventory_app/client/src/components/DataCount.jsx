import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const DataCount = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [countUser, setCountUsers] = useState([]);
  const [countBarang, setCountBarang] = useState([]);
  const [priceBarang, setPriceBarang] = useState([]);
  const [countBarangHP, setCountBarangHP] = useState([]);
  const [priceBhp, setPriceBhp] = useState([]);
  const [countService, setCountService] = useState([]);
  const [priceSrv, setPriceSrv] = useState([]);

  useEffect(() => {
    RefreshToken();
    getCountUsers();
    getCountBarang();
    getCountBarangHP();
    getCountService();
    getPriceBarang();
    getPriceSrv();
    getPriceBhp();
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
    const response = await axiosJWT.get(
      "http://localhost:2023/barangs?limit=100",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // for (let i = 0; i < response.data.response.length; i++) {
    //   let a = response.data.response[i].kd_brg;
    //   console.log(a);
    // }

    // console.log(response.data.response);
    setCountBarang(response.data.response.length);
  };

  const getPriceBarang = async () => {
    const response = await axiosJWT.get("http://localhost:2023/barangs/hrg", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setPriceBarang(response.data);
  };

  const getPriceSrv = async () => {
    const response = await axiosJWT.get("http://localhost:2023/srv/hrg", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setPriceSrv(response.data);
  };

  const getPriceBhp = async () => {
    const response = await axiosJWT.get("http://localhost:2023/bhp/hrg", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setPriceBhp(response.data);
  };

  const getCountBarangHP = async () => {
    const response = await axiosJWT.get("http://localhost:2023/bhp?limit=100", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setCountBarangHP(response.data.response.length);
  };

  const getCountService = async () => {
    const response = await axiosJWT.get("http://localhost:2023/srv?limit=100", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setCountService(response.data.response.length);
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
                      <h3 className="subtitle is-spaced">Total Harga Barang</h3>
                      <h1 className="subtitle has-text-weight-bold mt-1">
                        {priceBarang.map((harga) => (
                          <div>
                            Rp.{" "}
                            {new Intl.NumberFormat("id").format(
                              harga.totalAssetAmount
                            )}
                          </div>
                        ))}
                      </h1>
                    </div>
                  </div>
                  <div className="level-item has-widget-icon">
                    <div className="is-widget-icon">
                      <span className="icon has-text-success is-large">
                        <i className="mdi mdi-cash-usd mdi-48px"></i>
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
                      <h3 className="subtitle is-spaced">Total Barang Pakai</h3>
                      <h1 className="subtitle has-text-weight-bold mt-1">
                        {priceBhp.map((harga) => (
                          <div>
                            Rp.{" "}
                            {new Intl.NumberFormat("id").format(
                              harga.totalAssetAmount
                            )}
                          </div>
                        ))}
                      </h1>
                    </div>
                  </div>
                  <div className="level-item has-widget-icon">
                    <div className="is-widget-icon">
                      <span className="icon has-text-success is-large">
                        <i className="mdi mdi-cash-usd mdi-48px"></i>
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
                      <h3 className="subtitle is-spaced">
                        Total Harga Service
                      </h3>
                      <h1 className="subtitle has-text-weight-bold mt-1">
                        {priceSrv.map((harga) => (
                          <div>
                            Rp.{" "}
                            {new Intl.NumberFormat("id").format(
                              harga.totalAssetAmount
                            )}
                          </div>
                        ))}
                      </h1>
                    </div>
                  </div>
                  <div className="level-item has-widget-icon">
                    <div className="is-widget-icon">
                      <span className="icon has-text-success is-large">
                        <i className="mdi mdi-cash-usd mdi-48px"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="card tile is-child">
              <div className="card-content">
                <div className="level is-mobile">
                  <div className="level-item">
                    <div className="is-widget-label">
                      <h3 className="subtitle is-spaced">Data Barang</h3>
                      <h1 className="subtitle has-text-weight-bold mt-1">
                        {countBarang}
                      </h1>
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
                      <h3 className="subtitle is-spaced">Barang Pakai</h3>
                      <h1 className="subtitle has-text-weight-bold mt-1">
                        {countBarangHP}
                      </h1>
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
                      <h1 className="subtitle has-text-weight-bold mt-1">
                        {countService}
                      </h1>
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
          {user && user.user.role === "admin" && (
            <div className="tile is-parent">
              <div className="card tile is-child">
                <div className="card-content">
                  <div className="level is-mobile">
                    <div className="level-item">
                      <div className="is-widget-label">
                        <h3 className="subtitle is-spaced">Data User</h3>
                        <h1 className="subtitle has-text-weight-bold mt-1">
                          {countUser}
                        </h1>
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
          )}
        </div>
      </section>
    </div>
  );
};

export default DataCount;
