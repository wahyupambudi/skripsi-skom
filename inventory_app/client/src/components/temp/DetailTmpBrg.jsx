import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const DetailTmpBrg = () => {
  const [srvbrg, setHisService] = useState([]);
  const [kd_brg, setKdbrg] = useState("");
  const [nm_brg, setNmbrg] = useState("");
  const [spek_brg, setSpekbrg] = useState("");
  const [kondisi_brg, setKonbrg] = useState("");
  const [service_brg, setSrvbrg] = useState("");
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
        setSrvbrg(response.data.service_brg);
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
    getServicesById();
  }, [id, "", ""]);

  const getServicesById = async () => {
    let response = await axios.get(`http://localhost:2023/hisservice/${id}`);
    setHisService(response.data);
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
                        <th>Service</th>
                        <th>Lokasi</th>
                        <th>Perolehan</th>
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
                        <td>{kondisi_brg}</td>
                        <td>{service_brg}</td>
                        <td>{lokasi_brg}</td>
                        <td>{tgl_buy_brg}</td>
                        <td>
                          Rp. {new Intl.NumberFormat("id").format(harga_brg)}
                        </td>
                        <td>
                          <img src={url_brg} width={100} alt="Gambar Barang" />
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
                <h4>Riwayat Service Barang</h4>
                <div className="table-container">
                  <table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                      <tr>
                        {/* <th>Kode</th> */}
                        <th>Nama</th>
                        <th>List Service</th>
                        <th>Lokasi</th>
                        <th>Tanggal Mulai</th>
                        <th>Harga</th>
                        <th>Status</th>
                        <th>Tanggal Selesai</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {srvbrg.map((riwayat, index) => (
                        <tr key={riwayat.uuid_brg_srv}>
                          {/* <td>{riwayat.kd_brg}</td> */}
                          <td>{riwayat.nm_brg_srv}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: riwayat.srv_list,
                            }}
                          ></td>
                          <td>{riwayat.lokasi_srv}</td>
                          <td>{riwayat.tgl_mulai}</td>
                          <td>
                            Rp.{" "}
                            {new Intl.NumberFormat("id").format(
                              riwayat.harga_srv
                            )}
                          </td>
                          {riwayat.kondisi_brg === "Proses" && (
                            <td className="has-text-warning-dark ">
                              {riwayat.kondisi_brg}
                            </td>
                          )}
                          {riwayat.kondisi_brg === "Selesai" && (
                            <td className="has-text-primary-dark">
                              {riwayat.kondisi_brg}
                            </td>
                          )}
                          {riwayat.kondisi_brg === "Rusak" && (
                            <td className="has-text-danger-dark">
                              {riwayat.kondisi_brg}
                            </td>
                          )}
                          {riwayat.tgl_selesai === null && <td>-</td>}
                          {riwayat.tgl_selesai !== null && (
                            <td>{riwayat.tgl_selesai}</td>
                          )}
                          <td>
                            {new Date(riwayat.updatedAt).toLocaleString()}
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

export default DetailTmpBrg;
