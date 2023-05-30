import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ListDetailBhp = () => {
  const [hisbhp, sethisbhp] = useState([]);
  const [kd_bhp, setKdbhp] = useState("");
  const [nm_bhp, setNmbhp] = useState("");
  const [spek_bhp, setSpekbhp] = useState("");
  const [jml_bhp, setJmlbhp] = useState("");
  const [kondisi_bhp, setKonbhp] = useState("");
  const [lokasi_bhp, setLokbhp] = useState("");
  const [tgl_buy_bhp, setTglbhp] = useState("");
  const [harga_bhp, setHrgbhp] = useState("");
  const [url_bhp, setUrlbhp] = useState("");
  const [qrcode_url_bhp, setQrbhp] = useState("");
  const [msg, setMsg] = useState("");
  // const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:2023/bhp/${id}`);
        setKdbhp(response.data.kd_bhp);
        setNmbhp(response.data.nm_bhp);
        setSpekbhp(response.data.spek_bhp);
        setJmlbhp(response.data.jml_bhp);
        setKonbhp(response.data.kondisi_bhp);
        setLokbhp(response.data.lokasi_bhp);
        setTglbhp(response.data.tgl_buy_bhp);
        setHrgbhp(response.data.harga_bhp);
        setUrlbhp(response.data.url_bhp);
        setQrbhp(response.data.qrcode_url_bhp);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
    gethisbhp();
  }, [id, ""]);

  const gethisbhp = async () => {
    let response = await axios.get(`http://localhost:2023/hisbhp/${id}`);
    sethisbhp(response.data);
  };

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("Hello, world!", 10, 50);
  const dataUrl = canvas.toDataURL();

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
      <h2 className="title is-4">Detail Barang {nm_bhp}</h2>
      <div className="field is-grouped">
        <div className="control">
          <Link to="/bhp/" className="button is-primary mb-2">
            Kembali
          </Link>
        </div>
        <p id="canvas"></p>
        <img src={dataUrl} alt="" />
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
                        <th>Jumlah</th>
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
                        <td>{kd_bhp}</td>
                        <td>{nm_bhp}</td>
                        <td
                          dangerouslySetInnerHTML={{
                            __html: spek_bhp,
                          }}
                        ></td>
                        <td>{jml_bhp}</td>
                        <td>{kondisi_bhp}</td>
                        <td>{lokasi_bhp}</td>
                        <td>{tgl_buy_bhp}</td>
                        <td>
                          Rp. {new Intl.NumberFormat("id").format(harga_bhp)}
                        </td>
                        <td>
                          <img src={url_bhp} width={150} alt="Gambar Barang" />
                        </td>
                        <td>
                          <a href={qrcode_url_bhp} target="_blank">
                            <img
                              src={qrcode_url_bhp}
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
                        <th>Jumlah</th>
                        <th>Kondisi</th>
                        <th>Lokasi</th>
                        <th>Tanggal</th>
                        <th>Harga</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hisbhp.map((product, index) => (
                        <tr key={product.uuid_bhp}>
                          {/* <td>{product.kd_bhp}</td> */}
                          <td>{product.nm_bhp}</td>
                          <td
                            dangerouslySetInnerHTML={{
                              __html: product.spek_bhp,
                            }}
                          ></td>
                          <td>{product.jml_bhp}</td>
                          <td>{product.kondisi_bhp}</td>
                          <td>{product.lokasi_bhp}</td>
                          <td>{product.tgl_buy_bhp}</td>
                          <td>
                            Rp.{" "}
                            {new Intl.NumberFormat("id").format(
                              product.harga_bhp
                            )}
                          </td>
                          <td>
                            {new Date(product.updatedAt).toLocaleString()}
                          </td>
                          {/* <td>
                  <img src={product.url_bhp} width={150} alt="Gambar Barang" />
                </td> */}
                          {/* <td>
                  <a href={product.qrcode_url_bhp} target="_blank">
                    <img
                      src={product.qrcode_url_bhp}
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

export default ListDetailBhp;
