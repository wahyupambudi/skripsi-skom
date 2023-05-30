import Bhp from "../../models/BhpModel.js";
import hisBhp from "../../models/HisBhp.js";
import User from "../../models/UserModel.js";
import { Sequelize } from "sequelize";
// import path from "path";
// import fs from "fs";
// import qrcode from "qrcode";

// membuat fungsi untuk getBarang
export const getBhp = async (req, res) => {
  try {
    let response;
    // req.role berasal dari middleware ketika login
    if (req.role) {
      response = await Bhp.findAll({
        attributes: [
          "uuid_bhp",
          "kd_bhp",
          "nm_bhp",
          "spek_bhp",
          "jml_bhp",
          "kondisi_bhp",
          "lokasi_bhp",
          "tgl_buy_bhp",
          "harga_bhp",
          "image_bhp",
          "url_bhp",
          "qrcode_bhp",
          "qrcode_url_bhp",
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
export const getBhpById = async (req, res) => {
  try {
    const dataBhp = await Bhp.findOne({
      where: {
        uuid_bhp: req.params.id,
      },
    });
    // jika barang tidak ditemukan
    if (!dataBhp) return res.status(404).json({ msg: "Data Tidak Ditemukan" });

    let response;
    // req.role berasal dari middleware ketika login
    // jika user admin menampilkan berdasarkan id barang dari semua user
    if (req.role) {
      response = await Bhp.findOne({
        attributes: [
          "uuid_bhp",
          "kd_bhp",
          "nm_bhp",
          "spek_bhp",
          "jml_bhp",
          "kondisi_bhp",
          "lokasi_bhp",
          "tgl_buy_bhp",
          "harga_bhp",
          "image_bhp",
          "url_bhp",
          "qrcode_bhp",
          "qrcode_url_bhp",
        ],
        where: {
          id: dataBhp.id,
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
