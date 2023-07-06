import tmpBrg from "../../models/temp/tempBrg.js";
import hisBrg from "../../models/HisBrg.js";
import srvBrg from "../../models/ServicesBrg.js";
import hisBhp from "../../models/HisBhp.js";
import User from "../../models/UserModel.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";
// import path from "path";
// import fs from "fs";
// import qrcode from "qrcode";

// membuat fungsi untuk getBarang
export const getBarangs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await tmpBrg.count({
      where: {
        [Op.or]: [
          {
            kd_brg: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            nm_brg: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            spek_brg: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            lokasi_brg: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });
    const totalPage = Math.ceil(totalRows / limit);

    let response = await tmpBrg.findAll({
      where: {
        [Op.or]: [
          {
            kd_brg: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            nm_brg: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            spek_brg: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            lokasi_brg: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [["kd_brg", "DESC"]],
    });
    res.json({
      response: response,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// membuat fungsi untuk getBarang berdasarkan id/uuid barang
export const getBarangById = async (req, res) => {
  try {
    const barang = await tmpBrg.findOne({
      where: {
        kd_brg: req.params.id,
      },
    });
    // jika barang tidak ditemukan
    if (!barang) return res.status(404).json({ msg: "Data Tidak Ditemukan" });

    let response;
    // req.role berasal dari middleware ketika login
    // jika user admin menampilkan berdasarkan id barang dari semua user
    if (req.role) {
      response = await tmpBrg.findOne({
        attributes: [
          "uuid_brg",
          "kd_brg",
          "nm_brg",
          "spek_brg",
          "kondisi_brg",
          "lokasi_brg",
          "tgl_buy_brg",
          "harga_brg",
          "image_brg",
          "url_brg",
          "qrcode_brg",
          "qrcode_url_brg",
        ],
        where: {
          id: barang.id,
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
