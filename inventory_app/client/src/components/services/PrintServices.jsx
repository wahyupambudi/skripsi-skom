/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

const PrintServices = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  // const [msg, setMsg] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [barangs, setProducts] = useState([]);
  const [priceSrv, setPriceSrv] = useState([]);

  useEffect(() => {
    RefreshToken();
    getProducts();
    getPriceSrv();
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
    setProducts(response.data.response);
  };

  const getPriceSrv = async () => {
    const response = await axiosJWT.get("http://localhost:2023/srv/hrg", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPriceSrv(response.data);
  };

  // print
  const componentPDF = useRef();
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Data Services",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <div>
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
          <Link to="/services" className="button is-primary">
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
              <div className="b-table has-pagination is-size-7 ">
                <div className="table-wrapper has-mobile-cards">
                  <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Kode</th>
                        <th>Nama</th>
                        <th>Spesifikasi</th>
                        <th>List Service</th>
                        <th>Lokasi</th>
                        <th>Tgl Mulai</th>
                        <th>Harga</th>
                        <th>Status</th>
                        <th>Tgl Selesai</th>
                        <th>Foto Bukti</th>
                      </tr>
                    </thead>
                    <tbody>
                      {barangs.map((product, index) => (
                        <tr key={product.uuid_brg_srv}>
                          <td data-label="Nomor">{index + 1}</td>
                          <td data-label="Kode Barang">{product.kd_brg_srv}</td>
                          <td data-label="Nama Barang">{product.nm_brg_srv}</td>
                          <td
                            data-label="List Service"
                            dangerouslySetInnerHTML={{
                              __html: product.spek_brg_srv,
                            }}
                          ></td>

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
                          {product.kondisi_brg === "Proses" && (
                            <td
                              data-label="Status"
                              className="button is-warning is-rounded is-small"
                            >
                              {product.kondisi_brg}
                            </td>
                          )}
                          {product.kondisi_brg === "Selesai" && (
                            <td
                              data-label="Status"
                              className="button is-primary is-rounded is-small"
                            >
                              {product.kondisi_brg}
                            </td>
                          )}
                          {product.kondisi_brg === "Rusak" && (
                            <td
                              data-label="Status"
                              className="button is-danger is-rounded is-small"
                            >
                              {product.kondisi_brg}
                            </td>
                          )}
                          {product.tgl_selesai === null && (
                            <td data-label="Tanggal Selesai">-</td>
                          )}
                          {product.tgl_selesai !== null && (
                            <td data-label="Tanggal Selesai">
                              {" "}
                              {product.tgl_selesai}
                            </td>
                          )}
                          <td>
                            <img
                              src={product.url_srv}
                              width={100}
                              alt="bukti service"
                            />
                          </td>
                        </tr>
                      ))}
                      <tr style={{ fontWeight: "bold" }}>
                        <td data-label="Total Biaya" colspan="7">
                          <center>Total Biaya</center>
                        </td>
                        <td data-label="Total Biaya" colspan="3">
                          {priceSrv.map((harga) => (
                            <div align="center">
                              Rp.{" "}
                              {new Intl.NumberFormat("id").format(
                                harga.totalAssetAmount
                              )}
                            </div>
                          ))}
                        </td>
                      </tr>
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

export default PrintServices;
