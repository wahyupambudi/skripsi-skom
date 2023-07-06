import { Op } from "sequelize";
import srvBrg from "../../models/ServicesBrg.js";
import path from "path";
import fs from "fs";

export const putSrv = async (req, res) => {
  // mendapatkan kodebarang sesuai id
  const serviceBarang = await srvBrg.findOne({
    where: {
      uuid_brg_srv: req.params.id,
    },
  });

  // jika barang tidak ditemukan
  if (!serviceBarang)
    return res.status(404).json({ msg: "Data Barang Service Tidak Ditemukan" });

  // jika barang ditemukan ambil data dar req body
  const {
    kd_brg_srv,
    nm_brg_srv,
    spek_brg_srv,
    srv_list,
    lokasi_srv,
    tgl_mulai,
    harga_srv,
    kondisi_brg,
    tgl_selesai,
  } = req.body;

  let fileName;

  if (req.files === null) {
    fileName = serviceBarang.image_srv;
    // deklarasi variabel url diluar scope
    const url = `${req.protocol}://${req.get("host")}/images/srv/${fileName}`;
    try {
      // req.role berasal dari middleware ketika login
      if (req.role === "admin") {
        await srvBrg.update(
          {
            kd_brg_srv,
            nm_brg_srv,
            spek_brg_srv,
            srv_list,
            lokasi_srv,
            tgl_mulai,
            harga_srv,
            kondisi_brg,
            tgl_selesai,
          },
          {
            where: {
              id: serviceBarang.id,
            },
          }
        );
      } else {
        // jika user id dan barang user id tidak sama
        if (req.userId !== serviceBarang.userId)
          return res.status(403).json({ msg: "Akses Tidak ditemukan" });
        // jika kondisi terpenuhi
        await srvBrg.update(
          {
            kd_brg_srv,
            nm_brg_srv,
            spek_brg_srv,
            srv_list,
            lokasi_srv,
            tgl_mulai,
            harga_srv,
            kondisi_brg,
            tgl_selesai,
          },
          {
            where: {
              [Op.and]: [{ id: serviceBarang.id }, { userId: req.userId }],
            },
          }
        );
      }
      res.status(200).json({ msg: "Barang Service Berhasil di Update" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = Date.now() + "-" + file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg", ".webp"];

    // membuat kondisi jika variabel allowedType dan jika fileSize
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Gambar tidak sesuai" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Ukuran gambar harus dibawah 5MB" });

    // hapus gambar
    const filepath = `./public/images/srv/${serviceBarang.image_srv}`;
    fs.unlinkSync(filepath);

    // pindahkan gambar ke folder public
    file.mv(`./public/images/srv/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    // deklarasi variabel url diluar scope
    const url = `${req.protocol}://${req.get("host")}/images/srv/${fileName}`;
    try {
      // req.role berasal dari middleware ketika login
      if (req.role === "admin") {
        await srvBrg.update(
          {
            kd_brg_srv,
            nm_brg_srv,
            spek_brg_srv,
            srv_list,
            lokasi_srv,
            tgl_mulai,
            harga_srv,
            kondisi_brg,
            tgl_selesai,
            image_srv: fileName,
            url_srv: url,
          },
          {
            where: {
              id: serviceBarang.id,
            },
          }
        );
      } else {
        // jika user id dan barang user id tidak sama
        if (req.userId !== serviceBarang.userId)
          return res.status(403).json({ msg: "Akses Tidak ditemukan" });
        // jika kondisi terpenuhi
        await srvBrg.update(
          {
            kd_brg_srv,
            nm_brg_srv,
            spek_brg_srv,
            srv_list,
            lokasi_srv,
            tgl_mulai,
            harga_srv,
            kondisi_brg,
            tgl_selesai,
            image_srv: fileName,
            url_srv: url,
          },
          {
            where: {
              [Op.and]: [{ id: serviceBarang.id }, { userId: req.userId }],
            },
          }
        );
      }
      res.status(200).json({ msg: "Barang Service Berhasil di Update" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
