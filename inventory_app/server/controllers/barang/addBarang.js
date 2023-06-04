import Barang from "../../models/BrgModel.js";
// import HisBarang from "../../models/HisBrg.js";
// import User from "../../models/UserModel.js";
// import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import qrcode from "qrcode";

export const createBarang = async (req, res) => {
  // mendapatkan data input dari form
  const {
    kd_brg,
    nm_brg,
    spek_brg,
    kondisi_brg,
    lokasi_brg,
    tgl_buy_brg,
    harga_brg,
  } = req.body;

  // mendapatkan semua kode barang
  const getBarangAll = await Barang.findAll();
  for (let i = 0; i < getBarangAll.length; i++) {
    // console.log(getBarangAll[i].kd_brg);
    let new_kd_brg = getBarangAll[i].kd_brg;
    // jika kd_brg sama
    if (new_kd_brg === kd_brg)
      return res.status(500).json({ msg: "Kode Barang Tidak Boleh sama" });
  }

  // check jika file kosong
  if (req.files === null) {
    // return res.status(400).json({ msg: "Tidak ada file yang di upload" });

    // get img dummy
    const fileName = kd_brg + "imgdefault.png";
    const url = `${req.protocol}://${req.get(
      "host"
    )}/images/barang/${fileName}`;

    fs.copyFile(
      "./public/imgdefault.png",
      `./public/images/barang/${fileName}`,
      async (err) => {
        if (err) throw err;

        let newSpesifikasi = spek_brg.replace(/<[^>]+>/g, " ");
        let newTglMasuk = new Date(tgl_buy_brg).toLocaleDateString();
        let newHarga = new Intl.NumberFormat("id").format(harga_brg);

        // membuat qrcode dari data yang sudah di inputkan
        let data = {
          "Kode Barang \t\t\t\t": `${kd_brg}`,
          "Nama Barang \t\t\t": `${nm_brg}`,
          "Spesifikasi Barang \t": `${newSpesifikasi}`,
          "Kondisi Barang \t\t\t": `${kondisi_brg}`,
          "Lokasi Barang \t\t\t": `${lokasi_brg}`,
          "Tanggal Masuk \t\t\t": `${newTglMasuk}`,
          "Harga Barang \t\t\t": `Rp. ${newHarga}`,
        };

        // membuat perulangan menampilkan berupa teks saja.
        let text = "";
        for (const x in data) {
          text += `${x}: ${data[x]}\n`;
        }
        // masukkan data di variabel finalText
        let finalText = `Data Barang \n\n${text}`;

        const qrNameFile = Date.now() + "-" + nm_brg + ".png";

        qrcode.toFile(
          `./public/images/barang/qrcode/${qrNameFile}`,
          finalText,
          function (err) {
            if (err) throw err;
            // console.log(qrNameFile);
          }
        );

        const qrUrl = `${req.protocol}://${req.get(
          "host"
        )}/images/barang/qrcode/${qrNameFile}`;

        // proses create barang
        try {
          await Barang.create({
            kd_brg: kd_brg,
            nm_brg: nm_brg,
            spek_brg: spek_brg,
            kondisi_brg: kondisi_brg,
            lokasi_brg: lokasi_brg,
            tgl_buy_brg: tgl_buy_brg,
            harga_brg: harga_brg,
            image_brg: fileName,
            url_brg: url,
            qrcode_brg: qrNameFile,
            qrcode_url_brg: qrUrl,
            userId: req.userId,
          });
          res.status(201).json({ msg: "Data Barang Berhasil di Simpan." });
        } catch (error) {
          res.status(500).json({ msg: error.message });
        }
      }
    );
    // });
  } else if (req.files !== null) {
    // membuat variabel untuk menampung data gambar
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = Date.now() + "-" + file.md5 + ext;
    const url = `${req.protocol}://${req.get(
      "host"
    )}/images/barang/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    // membuat kondisi jika variabel allowedType dan jika fileSize
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Gambar tidak sesuai" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Ukuran gambar harus dibawah 5MB" });

    // jika kondisi benar maka akan melakukan proses simpan data
    file.mv(`./public/images/barang/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });

      let newSpesifikasi = spek_brg.replace(/<[^>]+>/g, " ");
      let newTglMasuk = new Date(tgl_buy_brg).toLocaleDateString();
      let newHarga = new Intl.NumberFormat("id").format(harga_brg);

      // membuat qrcode dari data yang sudah di inputkan
      let data = {
        "Kode Barang \t\t\t\t": `${kd_brg}`,
        "Nama Barang \t\t\t": `${nm_brg}`,
        "Spesifikasi Barang \t": `${newSpesifikasi}`,
        "Kondisi Barang \t\t\t": `${kondisi_brg}`,
        "Lokasi Barang \t\t\t": `${lokasi_brg}`,
        "Tanggal Masuk \t\t\t": `${newTglMasuk}`,
        "Harga Barang \t\t\t": `Rp. ${newHarga}`,
      };

      // membuat perulangan menampilkan berupa teks saja.
      let text = "";
      for (const x in data) {
        text += `${x}: ${data[x]}\n`;
      }
      // masukkan data di variabel finalText
      let finalText = `Data Barang \n\n${text}`;

      const qrNameFile = Date.now() + "-" + nm_brg + ext;

      qrcode.toFile(
        `./public/images/barang/qrcode/${qrNameFile}`,
        finalText,
        function (err) {
          if (err) throw err;
          // console.log(qrNameFile);
        }
      );

      const qrUrl = `${req.protocol}://${req.get(
        "host"
      )}/images/barang/qrcode/${qrNameFile}`;

      // proses create barang
      try {
        await Barang.create({
          kd_brg: kd_brg,
          nm_brg: nm_brg,
          spek_brg: spek_brg,
          kondisi_brg: kondisi_brg,
          lokasi_brg: lokasi_brg,
          tgl_buy_brg: tgl_buy_brg,
          harga_brg: harga_brg,
          image_brg: fileName,
          url_brg: url,
          qrcode_brg: qrNameFile,
          qrcode_url_brg: qrUrl,
          userId: req.userId,
        });
        res.status(201).json({ msg: "Data Barang Berhasil di Simpan." });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    });
  }
};
