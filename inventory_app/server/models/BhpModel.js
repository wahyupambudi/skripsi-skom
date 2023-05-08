import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";

// describe datatype
const { DataTypes } = Sequelize;

// membuat table Jasa Barangs
const Jbarangs = db.define(
  "tb_barang_habis_pakai",
  {
    uuid_bhp: {
      type: DataTypes.STRING,
      // membuat uuid secara otomatis
      defaultValue: DataTypes.UUIDV4,
      // tidak boleh kosong
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kd_bhp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nm_bhp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    spek_bhp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jml_bhp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kondisi_bhp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tgl_buy_bhp: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    harga_bhp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image_bhp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url_bhp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrcode_bhp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrcode_url_bhp: {
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

Users.hasMany(Jbarangs);
Jbarangs.belongsTo(Users, { foreignKey: "userId" });

export default Jbarangs;
