/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
// import "./print.css";

const PrintQrcodeBhp = () => {
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
    let response = await axiosJWT.get("http://localhost:2023/bhp/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
          <Link to="/bhp" className="button is-primary">
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
              <h4>QR Code Inventaris Barang Habis Pakai</h4>
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
                              <b>SMK 6 Bandar Lampung</b>
                            </td>
                            <td
                              style={{ border: "1px solid black" }}
                              rowspan="3"
                            >
                              <div className="card-image">
                                <img src={product.qrcode_url_bhp} alt="" />
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
                              <b>id : {product.kd_bhp}</b>
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
                              <b>{product.nm_bhp}</b>
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

export default PrintQrcodeBhp;
