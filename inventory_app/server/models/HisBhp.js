import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";
import Bhp from "./BhpModel.js";

// destruct datatype
const { DataTypes } = Sequelize;

// membuat table hisBhp
const hisBhp = db.define(
  "tb_his_bhp",
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
    freezeTableName: true,
  }
);

Users.hasMany(hisBhp);
hisBhp.belongsTo(Users, { foreignKey: "userId" });
hisBhp.belongsTo(Bhp, {
  foreignKey: "kd_bhp",
  targetKey: "kd_bhp",
  onDelete: "CASCADE",
});

export default hisBhp;

// (async () => {
//   await db.sync();
// })();
