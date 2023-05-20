import srvBrg from "../../models/ServicesBrg.js";
import hisSrvBrg from "../../models/HisSrvBrg.js";
import User from "../../models/UserModel.js";
import { Sequelize } from "sequelize";
// import path from "path";
// import fs from "fs";
// import qrcode from "qrcode";

// membuat fungsi untuk getBarang
export const getHisSrv = async (req, res) => {
  try {
    let response;
    // req.role berasal dari middleware ketika login
    if (req.role) {
      response = await hisSrvBrg.findAll({
        attributes: [
          "uuid_brg_srv",
          "kd_brg_srv",
          "nm_brg_srv",
          "spek_brg_srv",
          "srv_list",
          "tgl_mulai",
          "harga_srv",
          "status_srv",
          "tgl_selesai",
        ],
        // memasukkan nama, email dari model User
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// membuat fungsi untuk getBarang berdasarkan id/uuid barang
export const getHisServiceById = async (req, res) => {
  try {
    const hisServiceBarang = await hisSrvBrg.findAll({
      where: {
        uuid_brg_srv: req.params.id,
      },
    });

    // jika barang tidak ditemukan
    if (!hisServiceBarang)
      return res.status(404).json({ msg: "Data Tidak Ditemukan" });

    let response;
    // req.role berasal dari middleware ketika login
    // jika user admin menampilkan berdasarkan id barang dari semua user
    if (req.role) {
      response = await hisSrvBrg.findAll({
        attributes: [
          "uuid_brg_srv",
          "kd_brg_srv",
          "nm_brg_srv",
          "spek_brg_srv",
          "srv_list",
          "tgl_mulai",
          "harga_srv",
          "status_srv",
          "tgl_selesai",
        ],
        where: {
          kd_brg_srv: req.params.id,
        },
        // memasukkan nama, email dari model User
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
