/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

const ServicesList = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  // const [msg, setMsg] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [barangs, setProducts] = useState([]);

  useEffect(() => {
    RefreshToken();
    getProducts();
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

  const getProducts = async () => {
    let response = await axiosJWT.get("http://localhost:2023/srv/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(response.data);
  };

  function ConfirmDelete() {
    return confirm("Hapus Data Ini?");
  }

  const deleteProduct = async (productId) => {
    try {
      if (ConfirmDelete()) {
        await axios.delete(`http://localhost:2023/srv/${productId}`);
      } else {
        getProducts();
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
    // if (ConfirmDelete()) {
    //   await axios.delete(`http://localhost:2023/srv/${productId}`);
    // } else {
    //   alert("Asdasd");
    // }
    getProducts();
  };

  return (
    <div>
      {/* <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossorigin="anonymous"
      ></link> */}

      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous"
      ></script>

      <h1 className="title">Data Barang Service</h1>
      <div className="field is-grouped">
        <div className="control">
          <Link
            to="/services/print"
            className="button is-info is-outlined mb-2"
          >
            Cetak PDF
          </Link>
        </div>
      </div>
      <div>
        <div className="card has-table">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-table"></i>
              </span>
              Data Barang
            </p>
            <a href="#" className="card-header-icon">
              <span>
                <button
                  className="button is-primary is-small"
                  onClick={getProducts}
                >
                  <i className="mdi mdi-reload"></i>
                </button>
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="b-table has-pagination is-size-7 ">
              <div className="table-wrapper has-mobile-cards">
                <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode</th>
                      <th>Nama</th>
                      {/* <th>Spesifikasi</th> */}
                      <th>List Service</th>
                      <th>Lokasi</th>
                      <th>Tgl Mulai</th>
                      <th>Harga</th>
                      <th>Status</th>
                      <th>Tgl Selesai</th>
                      <th>Aksi</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {barangs.map((product, index) => (
                      <tr key={product.uuid_brg_srv}>
                        <td data-label="Nomor">{index + 1}</td>
                        <td data-label="Kode Barang">{product.kd_brg_srv}</td>
                        <td data-label="Nama Barang">{product.nm_brg_srv}</td>
                        {/* <td>{product.spek_brg_srv}</td> */}

                        <td
                          data-label="List Service"
                          dangerouslySetInnerHTML={{
                            __html: product.srv_list,
                          }}
                        ></td>

                        <td data-label="Lokasi Service">
                          {product.lokasi_srv}
                        </td>
                        <td data-label="Tanggal Mulai">
                          {/* {new Date(product.tgl_mulai).toLocaleDateString()} */}
                          {product.tgl_mulai}
                        </td>
                        <td data-label="Harga">
                          Rp.{" "}
                          {new Intl.NumberFormat("id").format(
                            product.harga_srv
                          )}
                        </td>
                        {product.status_srv === "Proses" && (
                          <td
                            data-label="Status"
                            className="button is-warning is-rounded is-small"
                          >
                            {product.status_srv}
                          </td>
                        )}
                        {product.status_srv === "Selesai" && (
                          <td
                            data-label="Status"
                            className="button is-primary is-rounded is-small"
                          >
                            {product.status_srv}
                          </td>
                        )}
                        {product.status_srv === "Rusak" && (
                          <td
                            data-label="Status"
                            className="button is-danger is-rounded is-small"
                          >
                            {product.status_srv}
                          </td>
                        )}
                        <td data-label="Tanggal Selesai">
                          {/* {new Date(product.tgl_selesai).toLocaleDateString()} */}
                          {product.tgl_selesai}
                        </td>

                        {/* <td>
                  <img src={product.url_brg_srv} width={150} alt="Gambar Barang" />
                </td> */}
                        {/* <td>
                  <a href={product.qrcode_url_brg_srv} target="_blank">
                    <img
                      src={product.qrcode_url_brg_srv}
                      width={100}
                      alt="QrCode"
                    />
                  </a>
                </td> */}
                        {user && user.user.role !== "ketuajurusan" && (
                          <td>
                            <Link
                              to={`/services/edit/${product.uuid_brg_srv}`}
                              className="button is-small is-warning"
                              title="Edit Data"
                            >
                              <span className="icon is-small">
                                <i className="mdi mdi-pencil"></i>
                              </span>
                            </Link>

                            <Link
                              to={`/services/detail/${product.uuid_brg_srv}`}
                              className="button is-small is-info"
                              title="Detail Data"
                            >
                              <span className="icon is-small">
                                <i className="mdi mdi-magnify"></i>
                              </span>
                            </Link>

                            <button
                              onClick={() =>
                                deleteProduct(product.uuid_brg_srv)
                              }
                              className="button is-small is-danger"
                              title="Hapus Data"
                            >
                              <span className="icon is-small">
                                <i className="mdi mdi-delete"></i>
                              </span>
                            </button>
                          </td>
                        )}
                        {user && user.user.role === "ketuajurusan" && (
                          <td>
                            <span className="ml-1"></span>
                            <Link
                              to={`/services/detail/${product.uuid_brg_srv}`}
                              className="button is-small is-info"
                              title="Detail Data"
                            >
                              <span className="icon is-small">
                                <i className="mdi mdi-magnify"></i>
                              </span>
                            </Link>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="notification">
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <div className="buttons has-addons">
                        <button type="button" className="button is-active">
                          1
                        </button>
                        <button type="button" className="button">
                          2
                        </button>
                        <button type="button" className="button">
                          3
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      <small>Page 1 of 3</small>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
