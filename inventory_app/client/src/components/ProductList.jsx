/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import ReactPaginate from "react-paginate";
import "./Login.css";

const ProductList = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [barangs, setProducts] = useState([]);

  useEffect(() => {
    RefreshToken();
    getProducts();
  }, [page, keyword]);

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
      `http://localhost:2023/barangs?search_query=${keyword}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setProducts(response.data.response);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
    // console.log(response.data.response);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    setKeyword(query);
  };

  function ConfirmDelete() {
    return window.confirm("Hapus Data Ini?");
  }

  const deleteProduct = async (productId) => {
    try {
      if (ConfirmDelete()) {
        await axios.delete(`http://localhost:2023/barangs/${productId}`);
      } else {
        getProducts();
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
    getProducts();
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

      <h1 className="title">Data Barang</h1>
      <div className="field is-grouped">
        {user && user.user.role !== "ketuajurusan" && (
          <div className="control">
            <Link to="/products/add" className="button is-primary mb-2">
              Tambah Data
            </Link>
          </div>
        )}
        <div className="control">
          <Link
            to="/products/print"
            className="button is-info is-outlined mb-2"
          >
            Cetak PDF
          </Link>
        </div>
        <div className="control">
          <Link
            to="/products/qrcode"
            className="button is-danger is-outlined mb-2"
          >
            Cetak QrCode
          </Link>
        </div>
      </div>
      <div>
        <div className="card has-table">
          <header className="card-header">
            <div className="ph">
              <span className="icon">
                <i className="mdi mdi-table"></i>
              </span>
              <span>Data Barang</span>
            </div>

            <form onSubmit={searchData}>
              <div className="card-header-icon field has-addons">
                <div className="control is-expanded">
                  <input
                    id="cari"
                    type="text"
                    className="input is-small"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari Data..."
                  />
                </div>
                <div className="control">
                  <button
                    type="submit"
                    className="button is-primary is-small"
                    onClick={getProducts}
                  >
                    <i className="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </form>

            <p className="ph1"></p>

            <a href="#" className="card-header-icon">
              <span>
                <button
                  className="button is-info is-small"
                  onClick={getProducts}
                >
                  <i className="mdi mdi-reload"></i>
                </button>
              </span>
            </a>
          </header>
          <div className="card-content">
            <div className="b-table has-pagination is-size-7">
              <div className="table-wrapper has-mobile-cards">
                <div ref={componentPDF} style={{ width: "100%" }}>
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
                        <th>Aksi</th>
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
                          {user && user.user.role !== "ketuajurusan" && (
                            <td>
                              <Link
                                to={`/products/edit/${product.kd_brg}`}
                                className="button is-small is-warning"
                                title="Edit Data"
                              >
                                <span className="icon is-small">
                                  <i className="mdi mdi-24px mdi-pencil"></i>
                                </span>
                              </Link>
                              <span className="ml-1"></span>
                              <Link
                                to={`/products/detail/${product.kd_brg}`}
                                className="button is-small is-info"
                                title="Detail Data"
                              >
                                <span className="icon is-small">
                                  <i className="mdi mdi-24px mdi-magnify"></i>
                                </span>
                              </Link>
                              <span className="ml-1"></span>

                              <Link
                                to={`/services/add/${product.kd_brg}`}
                                className="button is-small is-success"
                                title="Service Barang"
                              >
                                <span className="icon is-small">
                                  <i className="mdi mdi-24px mdi-wrench"></i>
                                </span>
                              </Link>
                              <span className="ml-1"></span>

                              <button
                                onClick={() => deleteProduct(product.kd_brg)}
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
                                to={`/products/detail/${product.kd_brg}`}
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
                  <p style={{ "margin-left": "10px", "margin-bottom": "10px" }}>
                    Total Data: {rows} Halaman: {rows ? page + 1 : 0} dari{" "}
                    {pages}
                  </p>
                  <p className="has-text-centered has-text-danger">{msg}</p>
                  <nav
                    className="pagination is-centered is-small mb-1"
                    key={rows}
                    role="navigation"
                    aria-label="pagination"
                  >
                    <ReactPaginate
                      previousLabel={"< Prev"}
                      nextLabel={"Next >"}
                      pageCount={Math.min(10, pages)}
                      onPageChange={changePage}
                      containerClassName={"pagination-list"}
                      pageLinkClassName={"pagination-link"}
                      previousLinkClassName={"pagination-previous"}
                      nextLinkClassName={"pagination-next"}
                      activeLinkClassName={"pagination-link is-current"}
                      disabledLinkClassName={"pagination-link is-disabled"}
                    />
                  </nav>
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
