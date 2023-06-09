import express from "express";
import {
  getHisBarang,
  getHisBarangById,
} from "../controllers/history/hisBarang.js";
import {
  getHisSrv,
  getHisServiceById,
} from "../controllers/history/hisService.js";
import { getHisBhp, getHisBhpById } from "../controllers/history/hisBhp.js";
import {
  verifyUser,
  ketuaJurusan,
  verifyToken,
} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/hisbarang", verifyUser, getHisBarang);
router.get("/hisbarang/:id", verifyUser, getHisBarangById);

router.get("/hisservice", verifyUser, getHisSrv);
router.get("/hisservice/:id", verifyUser, getHisServiceById);

router.get("/hisbhp", verifyUser, getHisBhp);
router.get("/hisbhp/:id", verifyUser, getHisBhpById);

export default router;
