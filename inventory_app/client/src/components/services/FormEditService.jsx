import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const FormEditService = () => {
  const [kd_brg, setKdbrg] = useState("");
  const [nm_brg, setNmbrg] = useState("");
  const [spek_brg, setSpekbrg] = useState("");
  const [srv_list, setSrvlist] = useState("");
  const [lokasi_brg, setLokbrg] = useState("");
  const [tgl_buy_brg, setTglbrg] = useState("");
  const [harga_brg, setHrgbrg] = useState("");
  const [kondisi_brg, setStssrv] = useState("");
  const [tgl_selesai, setTglselesai] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);

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
      setStssrv(response.data.kondisi_brg);
      setTglselesai(response.data.tgl_selesai);
      setFile(response.data.image_srv);
      setPreview(response.data.url_srv);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("kd_brg_srv", kd_brg);
    formData.append("nm_brg_srv", nm_brg);
    formData.append("spek_brg_srv", spek_brg);
    formData.append("srv_list", srv_list);
    formData.append("lokasi_srv", lokasi_brg);
    formData.append("tgl_mulai", tgl_buy_brg);
    formData.append("harga_srv", harga_brg);
    formData.append("kondisi_brg", kondisi_brg);
    formData.append("tgl_selesai", tgl_selesai);
    try {
      await axios.patch(`http://localhost:2023/srv/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/services");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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

      <div className="card column">
        <h1 className="title has-text-primary">Data Service Barang</h1>
        <h2 className="subtitle">Update Data Service Barang</h2>
      </div>
      <section className=" is-main-section">
        <div className="field is-grouped">
          <div className="control">
            <Link to="/services" className="button is-primary mb-2">
              Kembali
            </Link>
          </div>
        </div>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-ballot"></i>
              </span>
              Forms Update Service Barang
            </p>
          </header>

          <div className="card-content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered has-background-danger has-text-white is-size-5">
                {msg}
              </p>
              <br />
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Kode Barang</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        type="text"
                        className="input"
                        value={kd_brg}
                        onChange={(e) => setKdbrg(e.target.value)}
                        placeholder="Kode Barang"
                        required
                        disabled
                      />
                      <span className="icon is-small is-left">
                        <i className="mdi mdi-account"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Nama Barang</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        type="text"
                        className="input"
                        value={nm_brg}
                        onChange={(e) => setNmbrg(e.target.value)}
                        placeholder="Nama Barang"
                        required
                        disabled
                      />
                      <span className="icon is-small is-left">
                        <i className="mdi mdi-account"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Spesifikasi Barang</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <textarea
                        className="textarea"
                        value={spek_brg}
                        onChange={(e) => setSpekbrg(e.target.value)}
                        required
                        disabled
                      ></textarea>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">List Services</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <CKEditor
                        editor={ClassicEditor}
                        value={srv_list}
                        data={srv_list}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          // console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setSrvlist(editor.getData());
                          // console.log({ event, editor, data });
                        }}
                      />
                      {/* <textarea
                        className="textarea"
                        value={srv_list}
                        onChange={(e) => setSrvlist(e.target.value)}
                        required
                      ></textarea> */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Lokasi Services</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        type="text"
                        className="input"
                        value={lokasi_brg}
                        onChange={(e) => setLokbrg(e.target.value)}
                        placeholder="Lokasi Service"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="mdi mdi-account"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Tanggal Mulai </label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        type="date"
                        className="input"
                        value={tgl_buy_brg}
                        onChange={(e) => setTglbrg(e.target.value)}
                        placeholder="Tanggal Barang"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="mdi mdi-account"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Harga Barang</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        type="number"
                        className="input"
                        value={harga_brg}
                        onChange={(e) => setHrgbrg(e.target.value)}
                        placeholder="Harga Barang"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="mdi mdi-account"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Status Services</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <div className="select">
                        <select
                          value={kondisi_brg}
                          onChange={(e) => setStssrv(e.target.value)}
                          required
                        >
                          <option value="">Pilih Status</option>
                          <option value="Proses">Proses</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Rusak">Rusak</option>
                        </select>
                      </div>
                      <span className="icon is-small is-left">
                        <i className="mdi mdi-account"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Tanggal Selesai</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        type="date"
                        className="input"
                        value={tgl_selesai}
                        onChange={(e) => setTglselesai(e.target.value)}
                        placeholder="Tanggal Barang"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="mdi mdi-account"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Foto Bukti</label>
                </div>
                <div className="field-body">
                  <div className="file">
                    <input
                      type="file"
                      className="input"
                      onChange={loadImage}
                      placeholder="Foto Bukti"
                    />
                  </div>
                  {preview ? (
                    <figure className="ml-6 box">
                      <img src={preview} width={200} alt="Preview Image" />
                    </figure>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label">
                  {/* <!-- Left empty for spacing --> */}
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="field is-grouped">
                      <div className="control">
                        <button type="submit" className="button is-success">
                          Simpan Data Barang
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormEditService;
