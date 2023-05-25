import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const FormEditProduct = () => {
  const [kd_brg, setKdbrg] = useState("");
  const [nm_brg, setNmbrg] = useState("");
  const [spek_brg, setSpekbrg] = useState("");
  const [kondisi_brg, setKonbrg] = useState("");
  const [lokasi_brg, setLokbrg] = useState("");
  const [tgl_buy_brg, setTglbrg] = useState("");
  const [harga_brg, setHrgbrg] = useState("");
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
      const response = await axios.get(`http://localhost:2023/barangs/${id}`);
      setKdbrg(response.data.kd_brg);
      setNmbrg(response.data.nm_brg);
      setSpekbrg(response.data.spek_brg);
      setKonbrg(response.data.kondisi_brg);
      setLokbrg(response.data.lokasi_brg);
      setTglbrg(response.data.tgl_buy_brg);
      setHrgbrg(response.data.harga_brg);
      setFile(response.data.image_brg);
      setPreview(response.data.url_brg);
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

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("kd_brg", kd_brg);
    formData.append("nm_brg", nm_brg);
    formData.append("spek_brg", spek_brg);
    formData.append("kondisi_brg", kondisi_brg);
    formData.append("lokasi_brg", lokasi_brg);
    formData.append("tgl_buy_brg", tgl_buy_brg);
    formData.append("harga_brg", harga_brg);
    try {
      await axios.patch(`http://localhost:2023/barangs/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/products");
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
        <h1 className="title has-text-primary">Data Barang</h1>
        <h2 className="subtitle">Update Data Barang</h2>
      </div>
      <section className=" is-main-section">
        <div className="field is-grouped">
          <div className="control">
            <Link to="/products/" className="button is-primary mb-2">
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
              Forms Update Data Barang
            </p>
          </header>

          <div className="card-content">
            <form onSubmit={updateProduct}>
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
                      <CKEditor
                        editor={ClassicEditor}
                        value={spek_brg}
                        data={spek_brg}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          // console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setSpekbrg(editor.getData());
                          // console.log({ event, editor, data });
                        }}
                      />
                      {/* <textarea
                        className="textarea"
                        value={spek_brg}
                        onChange={(e) => setSpekbrg(e.target.value)}
                        required
                      ></textarea> */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Kondisi Barang</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        type="text"
                        className="input"
                        value={kondisi_brg}
                        onChange={(e) => setKonbrg(e.target.value)}
                        placeholder="Kondisi Barang"
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
                  <label className="label">Lokasi Barang</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded has-icons-left">
                      <input
                        type="text"
                        className="input"
                        value={lokasi_brg}
                        onChange={(e) => setLokbrg(e.target.value)}
                        placeholder="Lokasi Barang"
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
                  <label className="label">Tanggal </label>
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
                  <label className="label">Gambar Barang</label>
                </div>
                <div className="field-body">
                  <div className="file">
                    <input
                      type="file"
                      className="input"
                      onChange={loadImage}
                      placeholder="Gambar Barang"
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

export default FormEditProduct;
