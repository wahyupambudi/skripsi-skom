import express from "express";
import { getBarangs, getBarangById } from "../controllers/temp/tmpBarangs.js";
import { getBhp, getBhpById } from "../controllers/temp/tmpBhp.js";
import { getSrv, getServiceById } from "../controllers/temp/tmpService.js";
import {
  verifyUser,
  ketuaJurusan,
  verifyToken,
} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/tmp/brg", verifyUser, getBarangs);
router.get("/tmp/brg/:id", verifyUser, getBarangById);
router.get("/tmp/bhp", verifyUser, getBhp);
router.get("/tmp/bhp/:id", verifyUser, getBhpById);
router.get("/tmp/srv", verifyUser, getSrv);
router.get("/tmp/srv/:id", verifyUser, getServiceById);
// router.delete("/tmp/brg/:id", verifyUser, ketuaJurusan, deleteBarang);

export default router;
