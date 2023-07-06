import Barang from "../../models/BrgModel.js";
import hisBrg from "../../models/HisBrg.js";
import srvBrg from "../../models/ServicesBrg.js";
import User from "../../models/UserModel.js";
import { Sequelize } from "sequelize";
// import path from "path";
// import fs from "fs";
// import qrcode from "qrcode";

// membuat fungsi untuk getBarang
export const getHisBarang = async (req, res) => {
  try {
    let response;
    // req.role berasal dari middleware ketika login
    if (req.role) {
      response = await hisBrg.findAll({
        attributes: [
          "uuid_brg",
          "kd_brg",
          "nm_brg",
          "spek_brg",
          "kondisi_brg",
          "service_brg",
          "lokasi_brg",
          "tgl_buy_brg",
          "harga_brg",
          "image_brg",
          "url_brg",
          "qrcode_brg",
          "qrcode_url_brg",
          "updatedAt",
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
export const getHisBarangById = async (req, res) => {
  try {
    const hisBarang = await hisBrg.findAll({
      where: {
        kd_brg: req.params.id,
      },
    });
    // jika hisBarang tidak ditemukan
    if (!hisBarang)
      return res.status(404).json({ msg: "Data Tidak Ditemukan" });

    let response;
    // req.role berasal dari middleware ketika login
    // jika user admin menampilkan berdasarkan id barang dari semua user
    if (req.role) {
      response = await hisBrg.findAll({
        attributes: [
          "uuid_brg",
          "kd_brg",
          "nm_brg",
          "spek_brg",
          "kondisi_brg",
          "service_brg",
          "lokasi_brg",
          "tgl_buy_brg",
          "harga_brg",
          "image_brg",
          "url_brg",
          "qrcode_brg",
          "qrcode_url_brg",
          "updatedAt",
        ],
        where: {
          kd_brg: req.params.id,
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
