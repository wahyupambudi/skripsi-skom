/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
// import "./print.css";

const PrintProductList = () => {
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
    let response = await axiosJWT.get("http://localhost:2023/barangs/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(response.data);
  };

  // print
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Data Product",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <div>
      {/* <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossorigin="anonymous"
      ></link> */}

      {/* <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous"
      ></script> */}

      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"
      />

      <div className="field is-grouped">
        <div className="control">
          <Link to="/products" className="button is-primary">
            Kembali
          </Link>
        </div>
        <div className="control">
          <button
            className="button is-info is-outlined mb-2"
            onClick={generatePDF}
          >
            Cetak PDF
          </button>
        </div>
      </div>
      <div>
        <div ref={componentPDF} style={{ width: "100%" }}>
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
                  <table className="table is-fullwidth is-striped is-hoverable is-fullwidth ">
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
                        <th>Gambar</th>
                        <th>Qrcode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {barangs.map((product, index) => (
                        <tr key={product.uuid_brg}>
                          <td data-label="No">{index + 1}</td>
                          <td data-label="Kode Barang">{product.kd_brg}</td>
                          <td data-label="Nama Barang">{product.nm_brg}</td>
                          <td
                            data-label="Spesifikasi"
                            dangerouslySetInnerHTML={{
                              __html: product.spek_brg,
                            }}
                          ></td>
                          {/* <td>{product.spek_brg}</td> */}
                          <td data-label="Kondisi">{product.kondisi_brg}</td>
                          <td data-label="Lokasi Barang">
                            {product.lokasi_brg}
                          </td>
                          <td data-label="Tanggal perolehan">
                            {new Date(product.tgl_buy_brg).toLocaleDateString()}
                          </td>
                          <td data-label="Harga Barang">
                            Rp.{" "}
                            {new Intl.NumberFormat("id").format(
                              product.harga_brg
                            )}
                          </td>
                          <td>
                            <img
                              src={product.url_brg}
                              width={150}
                              alt="Gambar Barang"
                            />
                          </td>
                          <td>
                            <a href={product.qrcode_url_brg} target="_blank">
                              <img
                                src={product.qrcode_url_brg}
                                width={100}
                                alt="QrCode"
                              />
                            </a>
                          </td>
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
    </div>
  );
};

export default PrintProductList;
