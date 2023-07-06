import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";
import Barangs from "./BrgModel.js";

// destruct datatype
const { DataTypes } = Sequelize;

// membuat table hisBrg
const hisBrg = db.define(
  "tb_his_barang",
  {
    uuid_brg: {
      type: DataTypes.STRING,
      // membuat uuid secara otomatis
      defaultValue: DataTypes.UUIDV4,
      // tidak boleh kosong
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kd_brg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nm_brg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    spek_brg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kondisi_brg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    service_brg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lokasi_brg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tgl_buy_brg: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    harga_brg: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image_brg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url_brg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrcode_brg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrcode_url_brg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(hisBrg);
hisBrg.belongsTo(Users, { foreignKey: "userId" });
hisBrg.belongsTo(Barangs, {
  foreignKey: "kd_brg",
  targetKey: "kd_brg",
  onDelete: "CASCADE",
});

export default hisBrg;

// (async () => {
//   await db.sync();
// })();
