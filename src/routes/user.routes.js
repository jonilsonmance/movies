const { Router, request, response} = require("express")
const multer = require('multer')
const uploadConfig = require("../config/upload")

const UserController = require('../controllers/user.controller')
const UserAvatarController = require('../controllers/UserAvatarController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const userRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const userController = new UserController()
const userAvatarController = new UserAvatarController()

userRoutes.post("/", userController.create)
userRoutes.put("/",ensureAuthenticated, userController.update)
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)


module.exports = userRoutes