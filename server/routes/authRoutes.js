import express from "express"
import { login, logout, reg } from "../controllers/accountControllers"

const router = express.Router()

router.post("/register", reg)
router.post("/login", login)
router.post("/logout", logout)

export default router