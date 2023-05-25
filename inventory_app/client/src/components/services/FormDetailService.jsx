import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const FormDetailService = () => {
  const [hisbrg, sethisbrg] = useState([]);
  const [kd_brg, setKdbrg] = useState("");
  const [nm_brg, setNmbrg] = useState("");
  const [spek_brg, setSpekbrg] = useState("");
  const [srv_list, setSrvlist] = useState("");
  const [lokasi_brg, setLokbrg] = useState("");
  const [tgl_mulai, setTglbrg] = useState("");
  const [harga_brg, setHrgbrg] = useState("");
  const [status_srv, setStssrv] = useState("");
  const [tgl_selesai, setTglselesai] = useState("");
  const [msg, setMsg] = useState("");
  // const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:2023/srv/${id}`);
        setKdbrg(response.data.kd_brg_srv);
        setNmbrg(response.data.nm_brg_srv);
        setSpekbrg(response.data.spek_brg_srv);
        setSrvlist(response.data.srv_list);
        setLokbrg(response.data.lokasi_srv);
        setTglbrg(response.data.tgl_mulai);
        setHrgbrg(response.data.harga_srv);
        setStssrv(response.data.status_srv);
        setTglselesai(response.data.tgl_selesai);
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
    let response = await axios.get(`http://localhost:2023/hisservice/${id}`);
    sethisbrg(response.data);
  };

  return (
    <div>
      <h2 className="title is-4">Detail Barang {nm_brg}</h2>
      <div className="field is-grouped">
        <div className="control">
          <Link to="/services/" className="button is-primary mb-2">
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
                        <th>List Service</th>
                        <th>Lokasi</th>
                        <th>Tanggal Mulai</th>
                        <th>Harga</th>
                        <th>Status Service</th>
                        <th>Tanggal Selesai</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{kd_brg}</td>
                        <td>{nm_brg}</td>
                        <td>{spek_brg}</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: srv_list,
                          }}
                        ></td>
                        {/* <td>{srv_list}</td> */}
                        <td>{lokasi_brg}</td>
                        <td>{new Date(tgl_mulai).toLocaleDateString()}</td>
                        <td>
                          Rp. {new Intl.NumberFormat("id").format(harga_brg)}
                        </td>
                        <td>{status_srv}</td>
                        <td>{new Date(tgl_selesai).toLocaleDateString()}</td>
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
                        <th>Kode</th>
                        <th>Nama Barang</th>
                        <th>Spesifikasi</th>
                        <th>List Service</th>
                        <th>Lokasi</th>
                        <th>Tanggal Mulai</th>
                        <th>Harga</th>
                        <th>Status Service</th>
                        <th>Tanggal Selesai</th>
                        <th>UpdateAt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hisbrg.map((product, index) => (
                        <tr key={product.uuid_brg}>
                          <td>{product.kd_brg_srv}</td>
                          <td>{product.nm_brg_srv}</td>
                          <td>{product.spek_brg_srv}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: product.srv_list,
                            }}
                          ></td>
                          {/* <td>{product.srv_list}</td> */}
                          <td>{product.lokasi_srv}</td>
                          <td>
                            {new Date(product.tgl_mulai).toLocaleDateString()}
                          </td>
                          <td>
                            Rp.{" "}
                            {new Intl.NumberFormat("id").format(
                              product.harga_srv
                            )}
                          </td>
                          <td>{product.status_srv}</td>
                          <td>
                            {new Date(product.tgl_selesai).toLocaleDateString()}
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

export default FormDetailService;
