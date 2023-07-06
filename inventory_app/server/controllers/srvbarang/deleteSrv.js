import srvBrg from "../../models/ServicesBrg.js";
import { Op } from "sequelize";
import fs from "fs";

// membuat fungsi delete barang
export const delSrv = async (req, res) => {
  try {
    // mendapatkan kodebarang sesuai id
    const serviceBarang = await srvBrg.findOne({
      where: {
        uuid_brg_srv: req.params.id,
      },
    });

    // jika barang tidak ditemukan
    if (!serviceBarang)
      return res
        .status(404)
        .json({ msg: "Data Barang Service Tidak Ditemukan" });

    // req.role berasal dari middleware ketika login
    if (req.role === "admin") {
      const filepath = `./public/images/srv/${serviceBarang.image_srv}`;

      fs.copyFile(
        `./public/images/srv/${serviceBarang.image_srv}`,
        `./public/images/temp/srv/${serviceBarang.image_srv}`,
        async (err) => {
          if (err) throw err;
        }
      );

      if (!fs.existsSync(filepath)) {
        await srvBrg.destroy({
          where: {
            id: serviceBarang.id,
          },
        });
      } else {
        fs.unlinkSync(filepath);

        await srvBrg.destroy({
          where: {
            id: serviceBarang.id,
          },
        });
      }
    } else {
      // jika user id dan barang user id tidak sama
      if (req.userId !== serviceBarang.userId)
        return res.status(403).json({ msg: "Akses Tidak ditemukan" });
      // jika kondisi terpenuhi
      const filepath = `./public/images/srv/${serviceBarang.image_srv}`;

      fs.copyFile(
        `./public/images/srv/${serviceBarang.image_srv}`,
        `./public/images/temp/srv/${serviceBarang.image_srv}`,
        async (err) => {
          if (err) throw err;
        }
      );

      if (!fs.existsSync(filepath)) {
        await srvBrg.destroy({
          where: {
            id: serviceBarang.id,
          },
        });
      } else {
        fs.unlinkSync(filepath);
        await srvBrg.destroy({
          where: {
            [Op.and]: [{ id: serviceBarang.id }, { userId: req.userId }],
          },
        });
      }
    }
    res.status(200).json({ msg: "Barang Service Berhasil di Hapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
