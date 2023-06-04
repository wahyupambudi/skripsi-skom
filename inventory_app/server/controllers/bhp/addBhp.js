import Bhp from "../../models/BhpModel.js";
import path from "path";
import fs from "fs";
import qrcode from "qrcode";

export const addBhp = async (req, res) => {
  // mendapatkan data input dari form
  const {
    kd_bhp,
    nm_bhp,
    spek_bhp,
    jml_bhp,
    kondisi_bhp,
    lokasi_bhp,
    tgl_buy_bhp,
    harga_bhp,
  } = req.body;

  // mendapatkan semua kode barang
  const getBarangAll = await Bhp.findAll();
  for (let i = 0; i < getBarangAll.length; i++) {
    // console.log(getBarangAll[i].kd_bhp);
    let new_kd_bhp = getBarangAll[i].kd_bhp;
    // jika kd_bhp sama
    if (new_kd_bhp === kd_bhp)
      return res.status(500).json({ msg: "Kode Barang Tidak Boleh sama" });
  }

  // check jika file kosong
  if (req.files === null) {
    // return res.status(400).json({ msg: "Tidak ada file yang di upload" });

    // get img dummy
    const fileName = kd_bhp + "imgdefault.png";
    const url = `${req.protocol}://${req.get("host")}/images/bhp/${fileName}`;

    fs.copyFile(
      "./public/imgdefault.png",
      `./public/images/bhp/${fileName}`,
      async (err) => {
        if (err) throw err;

        let newSpesifikasi = spek_bhp.replace(/<[^>]+>/g, " ");
        let newTglMasuk = new Date(tgl_buy_bhp).toLocaleDateString();
        let newHarga = new Intl.NumberFormat("id").format(harga_bhp);

        // membuat qrcode dari data yang sudah di inputkan
        let data = {
          "Kode Barang \t\t\t\t": `${kd_bhp}`,
          "Nama Barang \t\t\t": `${nm_bhp}`,
          "Jumlah Barang \t\t\t": `${jml_bhp}`,
          "Kondisi Barang \t\t\t": `${kondisi_bhp}`,
          "Lokasi Barang \t\t\t": `${lokasi_bhp}`,
          "Tanggal Masuk \t\t\t": `${newTglMasuk}`,
          "Harga Barang \t\t\t": `Rp. ${newHarga}`,
          "Spesifikasi Barang \t": `${newSpesifikasi}`,
        };

        // membuat perulangan menampilkan berupa teks saja.
        let text = "";
        for (const x in data) {
          text += `${x}: ${data[x]}\n`;
        }
        // masukkan data di variabel finalText
        let finalText = `Data Barang Habis Pakai \n\n${text}`;

        let qrNameFile = "qr-" + nm_bhp + "-" + kd_bhp + ".png";

        qrcode.toFile(
          `./public/images/bhp/qrcode/${qrNameFile}`,
          finalText,
          function (err) {
            if (err) throw err;
            // console.log(qrNameFile);
          }
        );

        const qrUrl = `${req.protocol}://${req.get(
          "host"
        )}/images/bhp/qrcode/${qrNameFile}`;

        // proses create barang
        try {
          await Bhp.create({
            kd_bhp: kd_bhp,
            nm_bhp: nm_bhp,
            spek_bhp: spek_bhp,
            jml_bhp: jml_bhp,
            kondisi_bhp: kondisi_bhp,
            lokasi_bhp: lokasi_bhp,
            tgl_buy_bhp: tgl_buy_bhp,
            harga_bhp: harga_bhp,
            image_bhp: fileName,
            url_bhp: url,
            qrcode_bhp: qrNameFile,
            qrcode_url_bhp: qrUrl,
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
    const url = `${req.protocol}://${req.get("host")}/images/bhp/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg", ".webp"];

    // membuat kondisi jika variabel allowedType dan jika fileSize
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Gambar tidak sesuai" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Ukuran gambar harus dibawah 5MB" });

    // jika kondisi benar maka akan melakukan proses simpan data
    file.mv(`./public/images/bhp/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });

      let newSpesifikasi = spek_bhp.replace(/<[^>]+>/g, " ");
      let newTglMasuk = new Date(tgl_buy_bhp).toLocaleDateString();
      let newHarga = new Intl.NumberFormat("id").format(harga_bhp);
      // console.log(newHarga);

      // membuat qrcode dari data yang sudah di inputkan
      let data = {
        "Kode Barang \t\t\t\t": `${kd_bhp}`,
        "Nama Barang \t\t\t": `${nm_bhp}`,
        "Jumlah Barang \t\t\t": `${jml_bhp}`,
        "Kondisi Barang \t\t\t": `${kondisi_bhp}`,
        "Lokasi Barang \t\t\t": `${lokasi_bhp}`,
        "Tanggal Masuk \t\t\t": `${newTglMasuk}`,
        "Harga Barang \t\t\t": `Rp. ${newHarga}`,
        "Spesifikasi Barang \t": `${newSpesifikasi}`,
      };

      // membuat perulangan menampilkan berupa teks saja.
      let text = "";
      for (const x in data) {
        text += `${x}: ${data[x]}\n`;
      }
      // masukkan data di variabel finalText
      let finalText = `Data Barang Habis Pakai \n\n${text}`;

      let qrNameFile = "qr-" + nm_bhp + "-" + kd_bhp + ".png";

      qrcode.toFile(
        `./public/images/bhp/qrcode/${qrNameFile}`,
        finalText,
        function (err) {
          if (err) throw err;
          // console.log(qrNameFile);
        }
      );

      const qrUrl = `${req.protocol}://${req.get(
        "host"
      )}/images/bhp/qrcode/${qrNameFile}`;

      // proses create barang
      try {
        await Bhp.create({
          kd_bhp: kd_bhp,
          nm_bhp: nm_bhp,
          spek_bhp: spek_bhp,
          jml_bhp: jml_bhp,
          kondisi_bhp: kondisi_bhp,
          lokasi_bhp: lokasi_bhp,
          tgl_buy_bhp: tgl_buy_bhp,
          harga_bhp: harga_bhp,
          image_bhp: fileName,
          url_bhp: url,
          qrcode_bhp: qrNameFile,
          qrcode_url_bhp: qrUrl,
          userId: req.userId,
        });
        res.status(201).json({ msg: "Data Barang Berhasil di Simpan." });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    });
  }
};
