import express from "express";
import { getBhp, getHrgBhp, getBhpById } from "../controllers/bhp/Bhp.js";
import { addBhp } from "../controllers/bhp/addBhp.js";
import { editBhp } from "../controllers/bhp/editBhp.js";
import { deleteBhp } from "../controllers/bhp/deleteBhp.js";
import {
  verifyUser,
  ketuaJurusan,
  verifyToken,
} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/bhp", verifyUser, getBhp);
router.get("/bhp/hrg", verifyUser, getHrgBhp);
router.get("/bhp/:id", verifyUser, getBhpById);
router.post("/bhp", verifyUser, ketuaJurusan, addBhp);
router.patch("/bhp/:id", verifyUser, ketuaJurusan, editBhp);
router.delete("/bhp/:id", verifyUser, ketuaJurusan, deleteBhp);

export default router;
