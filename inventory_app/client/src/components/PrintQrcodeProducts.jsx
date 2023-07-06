/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
// import "./print.css";

const PrintQrcodeProducts = () => {
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
    let response = await axiosJWT.get(
      "http://localhost:2023/barangs?limit=100",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setProducts(response.data.response);
  };

  // print
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Userdata",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <div>
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
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <div
              ref={componentPDF}
              style={{
                width: "100%",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <table
                className="table is-fullwidth is-striped is-hoverable is-fullwidth "
                style={{ marginBottom: "-1rem" }}
              >
                <thead>
                  <center>
                    <tr>
                      <th></th>
                      <th>
                        <img
                          src={require("./tkj.png")}
                          alt="logo tkj"
                          style={{ maxWidth: "80px" }}
                        />
                      </th>
                      <th>
                        <center>
                          APLIKASI INVENTARIS BARANG TEKNIK KOMPUTER DAN
                          JARINGAN <br />
                          SMK NEGERI 6 BANDAR LAMPUNG <br />
                          <span style={{ fontSize: "12px" }}>
                            Jl. Laksamana R.E. Martadinata, Sukamaju, Kec. Tlk.
                            Betung Bar., Kota Bandar Lampung, Lampung 35231
                          </span>
                        </center>
                      </th>
                      <th></th>
                    </tr>
                  </center>
                </thead>
              </table>
              <hr
                style={{
                  "background-color": "#000",
                  margin: "0.2rem 0",
                }}
              />
              <hr
                style={{
                  "background-color": "#000",
                  margin: "0.2rem 0",
                }}
              />
              <br />
              <div className="columns is-multiline">
                {barangs.map((product, index) => (
                  <div className="column is-3 is-half-tablet">
                    <div className="is-size-7">
                      <table style={{ border: "1px solid black" }}>
                        <tbody>
                          <tr>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "10px",
                              }}
                            >
                              SMK 6 Bandar Lampung
                            </td>
                            <td
                              style={{ border: "1px solid black" }}
                              rowspan="3"
                            >
                              <div className="card-image">
                                <img src={product.qrcode_url_brg} alt="" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "10px",
                              }}
                            >
                              <b>Jurusan TKJ</b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "10px",
                              }}
                            >
                              <b>id : {product.kd_brg}</b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "10px",
                              }}
                              colspan="2"
                            >
                              <b>{product.nm_brg}</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintQrcodeProducts;
