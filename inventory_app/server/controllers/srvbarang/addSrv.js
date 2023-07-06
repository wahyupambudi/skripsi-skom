import srvBrg from "../../models/ServicesBrg.js";
import path from "path";
import fs from "fs";

export const addSrv = async (req, res) => {
  // mendapatkan data input dari form
  const {
    kd_brg_srv,
    nm_brg_srv,
    spek_brg_srv,
    srv_list,
    lokasi_srv,
    tgl_mulai,
    harga_srv,
    kondisi_brg,
    // tgl_selesai,
  } = req.body;

  // mendapatkan semua kode barang
  const getSrvAll = await srvBrg.findAll();
  for (let i = 0; i < getSrvAll.length; i++) {
    // console.log(getSrvAll[i].kd_brg);
    let new_tgl_mulai = getSrvAll[i].tgl_mulai;
    let new_kd_brg = getSrvAll[i].kd_brg_srv;
    let new_kondisi_brg = getSrvAll[i].kondisi_brg;
    // jika kd_brg_srv sama
    if (new_tgl_mulai === tgl_mulai && new_kd_brg === kd_brg_srv) {
      return res
        .status(500)
        .json({ msg: "Barang sudah pernah di proses pada tanggal yang sama" });
    } else if (new_kondisi_brg === "Proses" && new_kd_brg === kd_brg_srv) {
      return res
        .status(500)
        .json({ msg: "Selesaikan Proses Service Sebelumnya!" });
    }
  }
  // check jika file kosong
  if (req.files === null) {
    // return res.status(400).json({ msg: "Tidak ada file yang di upload" });

    // get img dummy
    const fileName = Date.now() + "-" + kd_brg_srv + "-" + "imgdefault.png";
    const url = `${req.protocol}://${req.get("host")}/images/srv/${fileName}`;

    fs.copyFile(
      "./public/imgdefault.png",
      `./public/images/srv/${fileName}`,
      async (err) => {
        if (err) throw err;

        // proses create barang
        try {
          await srvBrg.create({
            kd_brg_srv: kd_brg_srv,
            nm_brg_srv: nm_brg_srv,
            spek_brg_srv: spek_brg_srv,
            srv_list: srv_list,
            lokasi_srv: lokasi_srv,
            tgl_mulai: tgl_mulai,
            harga_srv: harga_srv,
            kondisi_brg: kondisi_brg,
            // tgl_selesai: tgl_selesai,
            image_srv: fileName,
            url_srv: url,
            userId: req.userId,
          });
          res.status(201).json({ msg: "Data Service Berhasil di Simpan." });
        } catch (error) {
          res.status(500).json({ msg: error.message });
        }
      }
    );
  } else if (req.files !== null) {
    // membuat variabel untuk menampung data gambar
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = Date.now() + "-" + file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/srv/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg", ".webp"];

    // membuat kondisi jika variabel allowedType dan jika fileSize
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Gambar tidak sesuai" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Ukuran gambar harus dibawah 5MB" });

    // jika kondisi benar maka akan melakukan proses simpan data
    file.mv(`./public/images/srv/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await srvBrg.create({
          kd_brg_srv: kd_brg_srv,
          nm_brg_srv: nm_brg_srv,
          spek_brg_srv: spek_brg_srv,
          srv_list: srv_list,
          lokasi_srv: lokasi_srv,
          tgl_mulai: tgl_mulai,
          harga_srv: harga_srv,
          kondisi_brg: kondisi_brg,
          // tgl_selesai: tgl_selesai,
          image_srv: fileName,
          url_srv: url,
          userId: req.userId,
        });
        res.status(201).json({ msg: "Data Service Berhasil di Simpan." });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    });
  }
};
