import Barang from "../../models/BrgModel.js";
// import HisBarang from "../../models/HisBrg.js";
// import User from "../../models/UserModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import qrcode from "qrcode";

export const updateBarang = async (req, res) => {
  // mendapatkan kodebarang sesuai id
  const barang = await Barang.findOne({
    where: {
      uuid_brg: req.params.id,
    },
  });

  // jika barang tidak ditemukan
  if (!barang)
    return res.status(404).json({ msg: "Data Barang Tidak Ditemukan" });

  // jika barang ditemukan ambil data dar req body
  const {
    kd_brg,
    nm_brg,
    spek_brg,
    kondisi_brg,
    lokasi_brg,
    tgl_buy_brg,
    harga_brg,
  } = req.body;

  // kode untuk manajemen gambar
  let fileName;
  let qrNameFile;
  // check jika gambar null maka langsung update data selain image
  if (req.files === null) {
    fileName = barang.image;
    // console.log(fileName);
  }
  // jika gambar tidak kosong melakukan proses update gambar
  else {
    const file = req.files.image;
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
    const filepath = `./public/images/barang/${barang.image_brg}`;
    const filePathQr = `./public/images/barang/qrcode/${barang.qrcode_brg}`;
    fs.unlinkSync(filepath);
    fs.unlinkSync(filePathQr);

    // pindahkan gambar ke folder public
    file.mv(`./public/images/barang/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    // membuat qrcode dari data yang sudah di inputkan
    let data = {
      "Kode Barang": kd_brg,
      "Nama Barang": nm_brg,
      "Spesifikasi Barang": spek_brg,
      "Kondisi Barang": kondisi_brg,
      "Lokasi Barang": lokasi_brg,
      "Tanggal Masuk": tgl_buy_brg,
      "Harga Barang": `Rp. ${harga_brg}`,
    };

    // membuat perulangan menampilkan berupa teks saja.
    let text = "";
    for (const x in data) {
      text += `${x}: ${data[x]}\n`;
    }
    // masukkan data di variabel finalText
    let finalText = `Data Barang \n\n${text}`;

    let qrNameFile = "qr" + Date.now() + "-" + kd_brg + ext;

    qrcode.toFile(
      `./public/images/barang/qrcode/${qrNameFile}`,
      finalText,
      function (err) {
        if (err) throw err;
      }
    );

    // deklarasi variabel url diluar scope
    const url = `${req.protocol}://${req.get(
      "host"
    )}/images/barang/${fileName}`;
    const qrUrl = `${req.protocol}://${req.get(
      "host"
    )}/images/barang/qrcode/${qrNameFile}`;

    try {
      // req.role berasal dari middleware ketika login
      if (req.role === "admin") {
        await Barang.update(
          {
            kd_brg,
            nm_brg,
            spek_brg,
            kondisi_brg,
            lokasi_brg,
            tgl_buy_brg,
            harga_brg,
            image_brg: fileName,
            url_brg: url,
            qrcode_brg: qrNameFile,
            qrcode_url_brg: qrUrl,
          },
          {
            where: {
              id: barang.id,
            },
          }
        );
      } else {
        // jika user id dan barang user id tidak sama
        if (req.userId !== barang.userId)
          return res.status(403).json({ msg: "Akses Tidak ditemukan" });
        // jika kondisi terpenuhi
        await Barang.update(
          {
            kd_brg,
            nm_brg,
            spek_brg,
            kondisi_brg,
            lokasi_brg,
            tgl_buy_brg,
            harga_brg,
            image_brg: fileName,
            url_brg: url,
            qrcode_brg: qrNameFile,
            qrcode_url_brg: qrUrl,
          },
          {
            where: {
              [Op.and]: [{ id: barang.id }, { userId: req.userId }],
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
