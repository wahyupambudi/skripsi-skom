import Barang from "../../models/BrgModel.js";
// import HisBarang from "../../models/HisBrg.js";
// import User from "../../models/UserModel.js";
import { Op } from "sequelize";
// import path from "path";
import fs from "fs";
// import qrcode from "qrcode";

// membuat fungsi delete barang
export const deleteBarang = async (req, res) => {
  try {
    // mendapatkan kodebarang sesuai id
    const barang = await Barang.findOne({
      where: {
        kd_brg: req.params.id,
      },
    });

    // jika barang tidak ditemukan
    if (!barang)
      return res.status(404).json({ msg: "Data Barang Tidak Ditemukan" });

    // req.role berasal dari middleware ketika login
    if (req.role === "admin") {
      // hapus gambar
      const filepath = `./public/images/barang/${barang.image_brg}`;
      const filePathQr = `./public/images/barang/qrcode/${barang.qrcode_brg}`;

      if (!fs.existsSync(filepath)) {
        fs.unlinkSync(filePathQr);
      } else if (!fs.existsSync(filePathQr)) {
        fs.unlinkSync(filepath);
      } else {
        fs.unlinkSync(filepath);
        fs.unlinkSync(filePathQr);
      }
      await Barang.destroy({
        where: {
          id: barang.id,
        },
      });
    } else {
      // jika user id dan barang user id tidak sama
      if (req.userId !== barang.userId)
        return res.status(403).json({ msg: "Akses Tidak ditemukan" });
      // jika kondisi terpenuhi
      // hapus gambar
      const filepath = `./public/images/barang/${barang.image_brg}`;
      const filePathQr = `./public/images/barang/qrcode/${barang.qrcode_brg}`;
      if (!fs.existsSync(filepath)) {
        fs.unlinkSync(filePathQr);
      } else if (!fs.existsSync(filePathQr)) {
        fs.unlinkSync(filepath);
      } else {
        fs.unlinkSync(filepath);
        fs.unlinkSync(filePathQr);
      }
      await Barang.destroy({
        where: {
          [Op.and]: [{ id: barang.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Barang Berhasil di Hapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
