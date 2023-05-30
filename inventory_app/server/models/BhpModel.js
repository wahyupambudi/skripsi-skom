import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";

// describe datatype
const { DataTypes } = Sequelize;

// membuat table Jasa Barangs
const Bhp = db.define(
  "tb_barang_hp",
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
    lokasi_bhp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tgl_buy_bhp: {
      type: DataTypes.DATEONLY,
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
    indexes: [
      {
        unique: true,
        fields: ["kd_bhp"],
      },
    ],
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Bhp);
Bhp.belongsTo(Users, { foreignKey: "userId" });

export default Bhp;
