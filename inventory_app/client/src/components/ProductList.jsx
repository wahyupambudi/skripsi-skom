/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

// import jQuery from "jquery";
// import DataTable from "datatables.net-bm";
// import "datatables.net-autofill-bm";
// import "datatables.net-buttons-bm";
// import "datatables.net-colreorder-bm";
// import DateTime from "datatables.net-datetime";
// import "datatables.net-fixedcolumns-bm";
// import "datatables.net-fixedheader-bm";
// import "datatables.net-keytable-bm";
// import "datatables.net-responsive-bm";
// import "datatables.net-rowgroup-bm";
// import "datatables.net-rowreorder-bm";
// // import "datatables.net-scroller-bm";
// import "datatables.net-searchbuilder-bm";
// import "datatables.net-searchpanes-bm";
// import "datatables.net-select-bm";
// import "datatables.net-staterestore-bm";

const ProductList = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
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
    let response = await axiosJWT.get("http://localhost:2023/barangs/", {
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
    if (ConfirmDelete()) {
      await axios.delete(`http://localhost:2023/barangs/${productId}`);
    } else {
      getProducts();
    }
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

      <h1 className="title">Products</h1>
      <h2 className="subtitle">List of Products</h2>
      <div className="field is-grouped">
        <div className="control">
          <Link to="/products/add" className="button is-primary mb-2">
            Tambah Data
          </Link>
        </div>
        <div className="control">
          <Link
            to="/products/add"
            className="button is-danger is-outlined mb-2"
          >
            Cetak QrCode
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
              <span className="icon">
                <i className="mdi mdi-reload"></i>
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="b-table has-pagination is-size-7">
              <div className="table-wrapper has-mobile-cards">
                <table className="table is-fullwidth is-striped is-hoverable ">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode</th>
                      <th>Nama</th>
                      <th>Spesifikasi</th>
                      <th>Kondisi</th>
                      <th>Lokasi</th>
                      <th>Tanggal</th>
                      <th>Harga</th>
                      <th>Aksi</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {barangs.map((product, index) => (
                      <tr key={product.uuid_brg}>
                        <td>{index + 1}</td>
                        <td>{product.kd_brg}</td>
                        <td>{product.nm_brg}</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: product.spek_brg,
                          }}
                        ></td>
                        {/* <td>{product.spek_brg}</td> */}
                        <td>{product.kondisi_brg}</td>
                        <td>{product.lokasi_brg}</td>
                        <td>
                          {new Date(product.tgl_buy_brg).toLocaleDateString()}
                        </td>
                        <td>
                          Rp.{" "}
                          {new Intl.NumberFormat("id").format(
                            product.harga_brg
                          )}
                        </td>
                        {/* <td>
                  <img src={product.url_brg} width={150} alt="Gambar Barang" />
                </td> */}
                        {/* <td>
                  <a href={product.qrcode_url_brg} target="_blank">
                    <img
                      src={product.qrcode_url_brg}
                      width={100}
                      alt="QrCode"
                    />
                  </a>
                </td> */}
                        <td>
                          <Link
                            to={`/products/edit/${product.uuid_brg}`}
                            className="button is-small is-warning"
                            title="Edit Data"
                          >
                            <span className="icon is-small">
                              <i className="mdi mdi-24px mdi-pencil"></i>
                            </span>
                          </Link>
                          <span className="ml-1"></span>
                          <Link
                            to={`/products/detail/${product.uuid_brg}`}
                            className="button is-small is-info"
                            title="Detail Data"
                          >
                            <span className="icon is-small">
                              <i className="mdi mdi-24px mdi-magnify"></i>
                            </span>
                          </Link>
                          <span className="ml-1"></span>

                          <Link
                            to={`/services/add/${product.uuid_brg}`}
                            className="button is-small is-success"
                            title="Service Barang"
                          >
                            <span className="icon is-small">
                              <i className="mdi mdi-24px mdi-wrench"></i>
                            </span>
                          </Link>
                          <span className="ml-1"></span>

                          <button
                            onClick={() => deleteProduct(product.uuid_brg)}
                            className="button is-small is-danger"
                            title="Hapus Data"
                          >
                            <span className="icon is-small">
                              <i className="mdi mdi-24px mdi-delete"></i>
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="notification">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
