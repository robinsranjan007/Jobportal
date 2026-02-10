import express from 'express'
import { updateProfile ,login,register, logout} from '../controller/user.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = express.Router()


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/profile/update").post(isAuthenticated,updateProfile)
router.route("logout").get(logout)


export default router
