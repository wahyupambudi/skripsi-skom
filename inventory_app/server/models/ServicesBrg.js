import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";
import Barangs from "./BrgModel.js";

// destruct datatype
const { DataTypes } = Sequelize;

// membuat table srvBrg
const srvBrg = db.define(
  "tb_service_brg",
  {
    uuid_brg_srv: {
      type: DataTypes.STRING,
      // membuat uuid secara otomatis
      defaultValue: DataTypes.UUIDV4,
      // tidak boleh kosong
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kd_brg_srv: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nm_brg_srv: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    spek_brg_srv: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    srv_list: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lokasi_srv: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tgl_mulai: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    harga_srv: {
      type: DataTypes.INTEGER,
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
    tgl_selesai: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    image_srv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url_srv: {
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
    tbBarangId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["kd_brg_srv", "uuid_brg_srv"],
      },
    ],
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(srvBrg);
Barangs.hasMany(srvBrg);
srvBrg.belongsTo(Users, { foreignKey: "userId" });
// srvBrg.belongsTo(Barangs, { foreignKey: "srvId" });
srvBrg.belongsTo(Barangs, {
  foreignKey: "kd_brg_srv",
  targetKey: "kd_brg",
  onDelete: "CASCADE",
});

export default srvBrg;

// (async () => {
//   await db.sync();
// })();
