import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
    const response = await axiosJWT.get("http://localhost:2023/barangs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:2023/barangs/${productId}`);
    getProducts();
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">List of Products</h2>
      <Link to="/products/add" className="button is-primary mb-2">
        Add New
      </Link>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode</th>
              <th>Nama</th>
              <th>Spek</th>
              <th>Jumlah</th>
              <th>Kondisi</th>
              <th>Tanggal</th>
              <th>Harga</th>
              <th>Gambar</th>
              <th>QrCode</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {barangs.map((product, index) => (
              <tr key={product.uuid_brg}>
                <td>{index + 1}</td>
                <td>{product.kd_brg}</td>
                <td>{product.nm_brg}</td>
                <td>{product.spek_brg}</td>
                <td>{product.jml_brg}</td>
                <td>{product.kondisi_brg}</td>
                <td>{product.tgl_buy_brg}</td>
                <td>Rp. {product.harga_brg}</td>
                <td>
                  <img src={product.url_brg} alt="Gambar Barang" />
                </td>
                <td>
                  <img src={product.qrcode_url_brg} alt="QrCode" />
                </td>
                <td>
                  <Link
                    to={`/products/edit/${product.uuid_brg}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.uuid_brg)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
