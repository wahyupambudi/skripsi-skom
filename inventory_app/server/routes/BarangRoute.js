import express from "express";
import {
  getBarangs,
  getCountHrgBrg,
  // countSrvByKd,
  getBarangById,
} from "../controllers/barang/Barangs.js";
import { createBarang } from "../controllers/barang/addBarang.js";
import { updateBarang } from "../controllers/barang/editBarang.js";
import { deleteBarang } from "../controllers/barang/deleteBarang.js";
import {
  verifyUser,
  ketuaJurusan,
  verifyToken,
} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/barangs", verifyUser, getBarangs);
router.get("/barangs/hrg", verifyUser, getCountHrgBrg);
// router.get("/barangs/count", verifyUser, countSrvByKd);
router.get("/barangs/:id", verifyUser, getBarangById);
router.post("/barangs", verifyUser, createBarang);
router.patch(
  "/barangs/:id",
  verifyUser,
  // verifyToken,
  ketuaJurusan,
  updateBarang
);
router.delete("/barangs/:id", verifyUser, ketuaJurusan, deleteBarang);

export default router;
