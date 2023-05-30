import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";

// destruct datatype
const { DataTypes } = Sequelize;

// membuat table Barangs
const Barangs = db.define(
  "tb_barang",
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
    indexes: [
      {
        unique: true,
        fields: ["kd_brg"],
      },
    ],
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Barangs);
Barangs.belongsTo(Users, { foreignKey: "userId" });

export default Barangs;

// (async () => {
//   await db.sync();
// })();
