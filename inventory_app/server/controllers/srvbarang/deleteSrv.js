import srvBrg from "../../models/ServicesBrg.js";
import { Op } from "sequelize";

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
      await srvBrg.destroy({
        where: {
          id: serviceBarang.id,
        },
      });
    } else {
      // jika user id dan barang user id tidak sama
      if (req.userId !== serviceBarang.userId)
        return res.status(403).json({ msg: "Akses Tidak ditemukan" });
      // jika kondisi terpenuhi
      await srvBrg.destroy({
        where: {
          [Op.and]: [{ id: serviceBarang.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Barang Service Berhasil di Hapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
