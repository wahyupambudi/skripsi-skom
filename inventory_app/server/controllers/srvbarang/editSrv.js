import { Op } from "sequelize";
import srvBrg from "../../models/ServicesBrg.js";

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
    status_srv,
    tgl_selesai,
  } = req.body;

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
          status_srv,
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
          status_srv,
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
};
