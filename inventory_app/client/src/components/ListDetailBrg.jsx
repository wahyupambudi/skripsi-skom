import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ListDetailBrg = () => {
  const [hisbrg, sethisbrg] = useState([]);
  const [kd_brg, setKdbrg] = useState("");
  const [nm_brg, setNmbrg] = useState("");
  const [spek_brg, setSpekbrg] = useState("");
  const [kondisi_brg, setKonbrg] = useState("");
  const [lokasi_brg, setLokbrg] = useState("");
  const [tgl_buy_brg, setTglbrg] = useState("");
  const [harga_brg, setHrgbrg] = useState("");
  const [url_brg, setUrlbrg] = useState("");
  const [qrcode_url_brg, setQrBrg] = useState("");
  const [msg, setMsg] = useState("");
  // const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:2023/barangs/${id}`);
        setKdbrg(response.data.kd_brg);
        setNmbrg(response.data.nm_brg);
        setSpekbrg(response.data.spek_brg);
        setKonbrg(response.data.kondisi_brg);
        setLokbrg(response.data.lokasi_brg);
        setTglbrg(response.data.tgl_buy_brg);
        setHrgbrg(response.data.harga_brg);
        setUrlbrg(response.data.url_brg);
        setQrBrg(response.data.qrcode_url_brg);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
    getHisbrg();
  }, [id, ""]);

  const getHisbrg = async () => {
    let response = await axios.get(`http://localhost:2023/hisbarang/${id}`);
    sethisbrg(response.data);
  };

  return (
    <div>
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css?family=Nunito"
        rel="stylesheet"
        type="text/css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"
      />
      <h2 className="title is-4">Detail Barang {nm_brg}</h2>
      <div className="field is-grouped">
        <div className="control">
          <Link to="/products/" className="button is-primary mb-2">
            Kembali
          </Link>
        </div>
      </div>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <div className="columns">
              <div className="field column box is-size-7">
                <h4>Detail Data Barang</h4>
                <div className="table-container">
                  <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                      <tr>
                        <th>Kode</th>
                        <th>Nama Barang</th>
                        <th>Spesifikasi</th>
                        <th>Kondisi</th>
                        <th>Lokasi</th>
                        <th>Perolahan</th>
                        <th>Harga</th>
                        <th>Gambar</th>
                        <th>Qrcode</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{kd_brg}</td>
                        <td>{nm_brg}</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: spek_brg,
                          }}
                        ></td>
                        {/* <td>{spek_brg}</td> */}
                        <td>{kondisi_brg}</td>
                        <td>{lokasi_brg}</td>
                        <td>{tgl_buy_brg}</td>
                        <td>
                          Rp. {new Intl.NumberFormat("id").format(harga_brg)}
                        </td>
                        <td>
                          <img src={url_brg} width={150} alt="Gambar Barang" />
                        </td>
                        <td>
                          <a href={qrcode_url_brg} target="_blank">
                            <img
                              src={qrcode_url_brg}
                              width={100}
                              alt="QrCode"
                            />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="columns">
              <p>{msg}</p>
              <div className="field column box is-size-7">
                <h4>Riwayat Perubahan Data Barang</h4>
                <div className="table-container">
                  <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                      <tr>
                        {/* <th>Kode</th> */}
                        <th>Nama</th>
                        <th>Spesifikasi</th>
                        <th>Kondisi</th>
                        <th>Lokasi</th>
                        <th>Tanggal</th>
                        <th>Harga</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hisbrg.map((product, index) => (
                        <tr key={product.uuid_brg}>
                          {/* <td>{product.kd_brg}</td> */}
                          <td>{product.nm_brg}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: product.spek_brg,
                            }}
                          ></td>
                          {/* <td>{product.spek_brg}</td> */}
                          <td>{product.kondisi_brg}</td>
                          <td>{product.lokasi_brg}</td>
                          <td>{product.tgl_buy_brg}</td>
                          <td>
                            Rp.{" "}
                            {new Intl.NumberFormat("id").format(
                              product.harga_brg
                            )}
                          </td>
                          <td>
                            {new Date(product.updatedAt).toLocaleString()}
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

export default ListDetailBrg;
