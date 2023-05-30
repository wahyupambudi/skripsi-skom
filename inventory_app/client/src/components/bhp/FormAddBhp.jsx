import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const FormAddBhp = () => {
  const [kd_bhp, setKdbhp] = useState("");
  const [nm_bhp, setNmbhp] = useState("");
  const [spek_bhp, setSpekbhp] = useState("");
  const [jml_bhp, setJmlbhp] = useState("");
  const [kondisi_bhp, setKonbhp] = useState("");
  const [lokasi_bhp, setLokbhp] = useState("");
  const [tgl_buy_bhp, setTglbhp] = useState("");
  const [harga_bhp, setHrgbhp] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("kd_bhp", kd_bhp);
    formData.append("nm_bhp", nm_bhp);
    formData.append("spek_bhp", spek_bhp);
    formData.append("jml_bhp", jml_bhp);
    formData.append("kondisi_bhp", kondisi_bhp);
    formData.append("lokasi_bhp", lokasi_bhp);
    formData.append("tgl_buy_bhp", tgl_buy_bhp);
    formData.append("harga_bhp", harga_bhp);
    try {
      await axios.post("http://localhost:2023/bhp", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/bhp");
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
        <h1 className="title has-text-primary">Data Barang Habis Pakai</h1>
        <h2 className="subtitle">Tambah Data Barang</h2>
      </div>
      <section className=" is-main-section">
        <div className="field is-grouped">
          <div className="control">
            <Link to="/bhp/" className="button is-primary mb-2">
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
              Forms Tambah Barang Habis Pakai
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
                    <p className="control is-expanded">
                      <input
                        type="text"
                        className="input"
                        value={kd_bhp}
                        onChange={(e) => setKdbhp(e.target.value)}
                        placeholder="Kode Barang"
                        required
                      />
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
                    <p className="control is-expanded">
                      <input
                        type="text"
                        className="input"
                        value={nm_bhp}
                        onChange={(e) => setNmbhp(e.target.value)}
                        placeholder="Nama Barang"
                        required
                      />
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
                    <p className="control is-expanded">
                      <CKEditor
                        editor={ClassicEditor}
                        value={spek_bhp}
                        data={spek_bhp}
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          // console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setSpekbhp(editor.getData());
                          // console.log({ event, editor, data });
                        }}
                      />
                      {/* <textarea
                        className="textarea"
                        value={spek_bhp}
                        onChange={(e) => setSpekbhp(e.target.value)}
                        required
                      ></textarea> */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal ">
                <div className="field-label is-normal">
                  <label className="label">Jumlah Barang</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control is-expanded">
                      <input
                        type="number"
                        className="input"
                        value={jml_bhp}
                        onChange={(e) => setJmlbhp(e.target.value)}
                        placeholder="Nama Barang"
                        required
                      />
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
                    <p className="control is-expanded">
                      <input
                        type="text"
                        className="input"
                        value={kondisi_bhp}
                        onChange={(e) => setKonbhp(e.target.value)}
                        placeholder="Kondisi Barang"
                        required
                      />
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
                    <p className="control is-expanded">
                      <input
                        type="text"
                        className="input"
                        value={lokasi_bhp}
                        onChange={(e) => setLokbhp(e.target.value)}
                        placeholder="Lokasi Barang"
                        required
                      />
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
                    <p className="control is-expanded">
                      <input
                        type="date"
                        className="input"
                        value={tgl_buy_bhp}
                        onChange={(e) => setTglbhp(e.target.value)}
                        placeholder="Tanggal Barang"
                        required
                      />
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
                    <p className="control is-expanded">
                      <input
                        type="number"
                        className="input"
                        value={harga_bhp}
                        onChange={(e) => setHrgbhp(e.target.value)}
                        placeholder="Harga Barang"
                        required
                      />
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
                          Simpan Data
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

export default FormAddBhp;
