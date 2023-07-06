/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const PrintBhp = () => {
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
    setBhp(response.data.response);
  };

  // print
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Data Barang Habis Pakai",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"
      />

      <h1 className="title">Barang Habis Pakai</h1>
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
      <div>
        <div ref={componentPDF} style={{ width: "100%" }}>
          <div className="card has-table">
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
                        src={require("../tkj.png")}
                        alt="logo tkj"
                        style={{ maxWidth: "80px" }}
                      />
                    </th>
                    <th>
                      <center>
                        APLIKASI INVENTARIS BARANG TEKNIK KOMPUTER DAN JARINGAN{" "}
                        <br />
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
                        <th>Gambar</th>
                        <th>Qrcode</th>
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
                          <td data-label="Lokasi Barang">
                            {product.lokasi_bhp}
                          </td>
                          <td data-label="Tanggal perolehan">
                            {new Date(product.tgl_buy_bhp).toLocaleDateString()}
                          </td>
                          <td data-label="Harga Barang">
                            Rp.{" "}
                            {new Intl.NumberFormat("id").format(
                              product.harga_bhp
                            )}
                          </td>
                          <td>
                            <img
                              src={product.url_bhp}
                              width={100}
                              alt="Gambar Barang"
                            />
                          </td>
                          <td>
                            <a href={product.qrcode_url_bhp} target="_blank">
                              <img
                                src={product.qrcode_url_bhp}
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

export default PrintBhp;
