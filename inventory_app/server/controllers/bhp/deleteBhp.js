import Bhp from "../../models/BhpModel.js";
import { Op } from "sequelize";
// import path from "path";
import fs from "fs";
// import qrcode from "qrcode";

// membuat fungsi delete barang
export const deleteBhp = async (req, res) => {
  try {
    // mendapatkan kodebarang sesuai id
    const dataBhp = await Bhp.findOne({
      where: {
        uuid_bhp: req.params.id,
      },
    });

    // jika barang tidak ditemukan
    if (!dataBhp)
      return res.status(404).json({ msg: "Data Barang Tidak Ditemukan" });

    // req.role berasal dari middleware ketika login
    if (req.role === "admin") {
      // hapus gambar
      const filepath = `./public/images/bhp/${dataBhp.image_bhp}`;
      const filePathQr = `./public/images/bhp/qrcode/${dataBhp.qrcode_bhp}`;

      if (!fs.existsSync(filepath)) {
        fs.unlinkSync(filePathQr);
      } else if (!fs.existsSync(filePathQr)) {
        fs.unlinkSync(filepath);
      } else {
        fs.unlinkSync(filepath);
        fs.unlinkSync(filePathQr);
      }

      await Bhp.destroy({
        where: {
          id: dataBhp.id,
        },
      });
    } else {
      // jika user id dan barang user id tidak sama
      if (req.userId !== dataBhp.userId)
        return res.status(403).json({ msg: "Akses Tidak ditemukan" });
      // jika kondisi terpenuhi
      // hapus gambar
      const filepath = `./public/images/bhp/${dataBhp.image_bhp}`;
      const filePathQr = `./public/images/bhp/qrcode/${dataBhp.qrcode_bhp}`;
      if (!fs.existsSync(filepath)) {
        fs.unlinkSync(filePathQr);
      } else if (!fs.existsSync(filePathQr)) {
        fs.unlinkSync(filepath);
      } else {
        fs.unlinkSync(filepath);
        fs.unlinkSync(filePathQr);
      }
      await Bhp.destroy({
        where: {
          [Op.and]: [{ id: dataBhp.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Barang Berhasil di Hapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
