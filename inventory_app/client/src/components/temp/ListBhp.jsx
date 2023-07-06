/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "../Login.css";

const ListBhp = () => {
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
  const [bhp, setBhp] = useState([]);

  useEffect(() => {
    RefreshToken();
    getBhp();
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

  const getBhp = async () => {
    let response = await axiosJWT.get(
      `http://localhost:2023/tmp/bhp?search_query=${keyword}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBhp(response.data.response);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
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
        <div className="control">
          <Link to="/bhp" className="button is-primary mb-2">
            Kembali
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
              <span>Data Barang Habis Pakai</span>
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
                    onClick={getBhp}
                  >
                    <i className="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </form>

            <p className="ph1"></p>
            <a href="#" className="card-header-icon">
              <span>
                <button className="button is-info is-small" onClick={getBhp}>
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
                      <th>Gambar</th>
                      {/* <th>Aksi</th> */}
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
                        <td>
                          <img
                            src={product.url_bhp}
                            width={100}
                            alt="Gambar Barang"
                          />
                        </td>
                        {/* {user && user.user.role !== "ketuajurusan" && (
                          <td>
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
                        )} */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ "margin-left": "10px", "margin-bottom": "10px" }}>
                  Total Data: {rows} Halaman: {rows ? page + 1 : 0} dari {pages}
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
  );
};

export default ListBhp;
