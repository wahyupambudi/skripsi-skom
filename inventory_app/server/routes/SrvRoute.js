import express from "express";
import {
  getSrv,
  getTotSrv,
  getServiceById,
} from "../controllers/srvbarang/services.js";
import { addSrv } from "../controllers/srvbarang/addSrv.js";
import { putSrv } from "../controllers/srvbarang/editSrv.js";
import { delSrv } from "../controllers/srvbarang/deleteSrv.js";
import {
  verifyUser,
  ketuaJurusan,
  verifyToken,
} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/srv", verifyUser, getSrv);
router.get("/srv/hrg", verifyUser, getTotSrv);
router.get("/srv/:id", verifyUser, getServiceById);
router.post("/srv", verifyUser, ketuaJurusan, addSrv);
router.patch(
  "/srv/:id",
  verifyUser,
  // verifyToken,
  ketuaJurusan,
  putSrv
);
router.delete("/srv/:id", verifyUser, ketuaJurusan, delSrv);

export default router;
