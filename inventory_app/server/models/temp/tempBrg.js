import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import Users from "../UserModel.js";

// destruct datatype
const { DataTypes } = Sequelize;

// membuat table Barangs
const tmpBrg = db.define(
  "tb_temp_brg",
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
      type: DataTypes.INTEGER,
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

Users.hasMany(tmpBrg);
tmpBrg.belongsTo(Users, { foreignKey: "userId" });

export default tmpBrg;

// (async () => {
//   await db.sync();
// })();
