/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

const BhpList = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  // const [msg, setMsg] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [bhp, setBhp] = useState([]);

  useEffect(() => {
    RefreshToken();
    getBhp();
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

  const getBhp = async () => {
    let response = await axiosJWT.get("http://localhost:2023/bhp/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBhp(response.data);
  };

  function ConfirmDelete() {
    return confirm("Hapus Data Ini?");
  }

  const deleteProduct = async (productId) => {
    try {
      if (ConfirmDelete()) {
        await axios.delete(`http://localhost:2023/bhp/${productId}`);
      } else {
        getBhp();
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
    getBhp();
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"
      />

      <h1 className="title">Barang Habis Pakai</h1>
      <div className="field is-grouped">
        {user && user.user.role !== "ketuajurusan" && (
          <div className="control">
            <Link to="/bhp/add" className="button is-primary mb-2">
              Tambah Data
            </Link>
          </div>
        )}
        <div className="control">
          <Link to="/bhp/print" className="button is-info is-outlined mb-2">
            Cetak PDF
          </Link>
        </div>
        <div className="control">
          <Link to="/bhp/qrcode" className="button is-danger is-outlined mb-2">
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
              Data Barang Habis Pakai
            </p>
            <a href="#" className="card-header-icon">
              <span>
                <button className="button is-primary is-small" onClick={getBhp}>
                  <i className="mdi mdi-reload"></i>
                </button>
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="b-table has-pagination is-size-7">
              <div className="table-wrapper has-mobile-cards">
                <table className="table is-fullwidth is-striped is-hoverable is-fullwidth ">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Kode</th>
                      <th>Nama</th>
                      <th>Spesifikasi</th>
                      <th>Jumlah</th>
                      <th>Kondisi</th>
                      <th>Lokasi</th>
                      <th>Tanggal</th>
                      <th>Harga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bhp.map((product, index) => (
                      <tr key={product.uuid_bhp}>
                        <td data-label="No">{index + 1}</td>
                        <td data-label="Kode Barang">{product.kd_bhp}</td>
                        <td data-label="Nama Barang">{product.nm_bhp}</td>
                        <td
                          data-label="Spesifikasi"
                          dangerouslySetInnerHTML={{
                            __html: product.spek_bhp,
                          }}
                        ></td>
                        <td>{product.jml_bhp}</td>
                        <td data-label="Kondisi">{product.kondisi_bhp}</td>
                        <td data-label="Lokasi Barang">{product.lokasi_bhp}</td>
                        <td data-label="Tanggal perolehan">
                          {new Date(product.tgl_buy_bhp).toLocaleDateString()}
                        </td>
                        <td data-label="Harga Barang">
                          Rp.{" "}
                          {new Intl.NumberFormat("id").format(
                            product.harga_bhp
                          )}
                        </td>
                        {user && user.user.role !== "ketuajurusan" && (
                          <td>
                            <Link
                              to={`/bhp/edit/${product.uuid_bhp}`}
                              className="button is-small is-warning"
                              title="Edit Data"
                            >
                              <span className="icon is-small">
                                <i className="mdi mdi-24px mdi-pencil"></i>
                              </span>
                            </Link>
                            <span className="ml-1"></span>
                            <Link
                              to={`/bhp/detail/${product.uuid_bhp}`}
                              className="button is-small is-info"
                              title="Detail Data"
                            >
                              <span className="icon is-small">
                                <i className="mdi mdi-24px mdi-magnify"></i>
                              </span>
                            </Link>
                            <span className="ml-1"></span>

                            <button
                              onClick={() => deleteProduct(product.uuid_bhp)}
                              className="button is-small is-danger"
                              title="Hapus Data"
                            >
                              <span className="icon is-small">
                                <i className="mdi mdi-24px mdi-delete"></i>
                              </span>
                            </button>
                          </td>
                        )}
                        {user && user.user.role === "ketuajurusan" && (
                          <td>
                            <span className="ml-1"></span>
                            <Link
                              to={`/bhp/detail/${product.uuid_bhp}`}
                              className="button is-small is-info"
                              title="Detail Data"
                            >
                              <span className="icon is-small">
                                <i className="mdi mdi-24px mdi-magnify"></i>
                              </span>
                            </Link>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BhpList;
