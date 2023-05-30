import Bhp from "../../models/BhpModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import qrcode from "qrcode";

export const editBhp = async (req, res) => {
  // mendapatkan kodebarang sesuai id
  const dataBhp = await Bhp.findOne({
    where: {
      uuid_bhp: req.params.id,
    },
  });

  // jika barang tidak ditemukan
  if (!dataBhp)
    return res.status(404).json({ msg: "Data Barang Tidak Ditemukan" });

  // jika barang ditemukan ambil data dar req body
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

  // kode untuk manajemen gambar
  let fileName;
  let qrNameFile;
  // check jika gambar null maka langsung update data selain image
  if (req.files === null) {
    fileName = dataBhp.image_bhp;
    // console.log(fileName);

    let newSpesifikasi = spek_bhp.replace(/<[^>]+>/g, " ");
    let newTglMasuk = new Date(tgl_buy_bhp).toLocaleDateString();
    let newHarga = new Intl.NumberFormat("id").format(harga_bhp);

    // membuat qrcode dari data yang sudah di inputkan
    let data = {
      "Kode Barang \t\t\t\t": `${kd_bhp}`,
      "Nama Barang \t\t\t": `${nm_bhp}`,
      "Spesifikasi Barang \t": `${newSpesifikasi}`,
      "Jumlah Barang \t\t\t": `${jml_bhp}`,
      "Kondisi Barang \t\t\t": `${kondisi_bhp}`,
      "Lokasi Barang \t\t\t": `${lokasi_bhp}`,
      "Tanggal Masuk \t\t\t": `${newTglMasuk}`,
      "Harga Barang \t\t\t": `Rp. ${newHarga}`,
    };

    // membuat perulangan menampilkan berupa teks saja.
    let text = "";
    for (const x in data) {
      text += `${x}: ${data[x]}\n`;
    }
    // masukkan data di variabel finalText
    let finalText = `Data Barang Habis Pakai \n\n${text}`;

    let qrNameFile = "qr" + Date.now() + "-" + kd_bhp + "update" + ".png";

    qrcode.toFile(
      `./public/images/bhp/qrcode/${qrNameFile}`,
      finalText,
      function (err) {
        if (err) throw err;
      }
    );

    // deklarasi variabel url diluar scope
    const url = `${req.protocol}://${req.get("host")}/images/bhp/${fileName}`;
    const qrUrl = `${req.protocol}://${req.get(
      "host"
    )}/images/bhp/qrcode/${qrNameFile}`;

    try {
      // req.role berasal dari middleware ketika login
      if (req.role === "admin") {
        await Bhp.update(
          {
            kd_bhp,
            nm_bhp,
            spek_bhp,
            jml_bhp,
            kondisi_bhp,
            lokasi_bhp,
            tgl_buy_bhp,
            harga_bhp,
            qrcode_bhp: qrNameFile,
            qrcode_url_bhp: qrUrl,
          },
          {
            where: {
              id: dataBhp.id,
            },
          }
        );
      } else {
        // jika user id dan barang user id tidak sama
        if (req.userId !== dataBhp.userId)
          return res.status(403).json({ msg: "Akses Tidak ditemukan" });
        // jika kondisi terpenuhi
        await Bhp.update(
          {
            kd_bhp,
            nm_bhp,
            spek_bhp,
            jml_bhp,
            kondisi_bhp,
            lokasi_bhp,
            tgl_buy_bhp,
            harga_bhp,
            qrcode_bhp: qrNameFile,
            qrcode_url_bhp: qrUrl,
          },
          {
            where: {
              [Op.and]: [{ id: dataBhp.id }, { userId: req.userId }],
            },
          }
        );
      }
      res.status(200).json({ msg: "Barang Berhasil di Update" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  // jika gambar tidak kosong melakukan proses update gambar
  else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = Date.now() + "-" + file.md5 + ext;
    // console.log(fileName);

    const allowedType = [".png", ".jpg", ".jpeg"];

    // membuat kondisi jika variabel allowedType dan jika fileSize
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Gambar tidak sesuai" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Ukuran gambar harus dibawah 5MB" });

    // hapus gambar
    const filepath = `./public/images/bhp/${dataBhp.image_bhp}`;
    const filePathQr = `./public/images/bhp/qrcode/${dataBhp.qrcode_bhp}`;
    fs.unlinkSync(filepath);
    fs.unlinkSync(filePathQr);

    // pindahkan gambar ke folder public
    file.mv(`./public/images/bhp/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    let newSpesifikasi = spek_bhp.replace(/<[^>]+>/g, " ");
    let newTglMasuk = new Date(tgl_buy_bhp).toLocaleDateString();
    let newHarga = new Intl.NumberFormat("id").format(harga_bhp);

    // membuat qrcode dari data yang sudah di inputkan
    let data = {
      "Kode Barang \t\t\t\t": `${kd_bhp}`,
      "Nama Barang \t\t\t": `${nm_bhp}`,
      "Spesifikasi Barang \t": `${newSpesifikasi}`,
      "Jumlah Barang \t\t\t": `${jml_bhp}`,
      "Kondisi Barang \t\t\t": `${kondisi_bhp}`,
      "Lokasi Barang \t\t\t": `${lokasi_bhp}`,
      "Tanggal Masuk \t\t\t": `${newTglMasuk}`,
      "Harga Barang \t\t\t": `Rp. ${newHarga}`,
    };

    // membuat perulangan menampilkan berupa teks saja.
    let text = "";
    for (const x in data) {
      text += `${x}: ${data[x]}\n`;
    }
    // masukkan data di variabel finalText
    let finalText = `Data Barang Habis Pakai \n\n${text}`;

    let qrNameFile = "qr" + Date.now() + "-" + kd_bhp + "-update-" + ext;

    qrcode.toFile(
      `./public/images/bhp/qrcode/${qrNameFile}`,
      finalText,
      function (err) {
        if (err) throw err;
      }
    );

    // deklarasi variabel url diluar scope
    const url = `${req.protocol}://${req.get("host")}/images/bhp/${fileName}`;
    const qrUrl = `${req.protocol}://${req.get(
      "host"
    )}/images/bhp/qrcode/${qrNameFile}`;

    try {
      // req.role berasal dari middleware ketika login
      if (req.role === "admin") {
        await Bhp.update(
          {
            kd_bhp,
            nm_bhp,
            spek_bhp,
            jml_bhp,
            kondisi_bhp,
            lokasi_bhp,
            tgl_buy_bhp,
            harga_bhp,
            image_bhp: fileName,
            url_bhp: url,
            qrcode_bhp: qrNameFile,
            qrcode_url_bhp: qrUrl,
          },
          {
            where: {
              id: dataBhp.id,
            },
          }
        );
      } else {
        // jika user id dan barang user id tidak sama
        if (req.userId !== dataBhp.userId)
          return res.status(403).json({ msg: "Akses Tidak ditemukan" });
        // jika kondisi terpenuhi
        await Bhp.update(
          {
            kd_bhp,
            nm_bhp,
            spek_bhp,
            jml_bhp,
            kondisi_bhp,
            lokasi_bhp,
            tgl_buy_bhp,
            harga_bhp,
            image_bhp: fileName,
            url_bhp: url,
            qrcode_bhp: qrNameFile,
            qrcode_url_bhp: qrUrl,
          },
          {
            where: {
              [Op.and]: [{ id: dataBhp.id }, { userId: req.userId }],
            },
          }
        );
      }
      res.status(200).json({ msg: "Barang Berhasil di Update" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
