const {Router} = require("express");
const UserControler = require('../controllers/user.controller');

const userRoutes  = Router()
const userController = new UserControler()

userRoutes.post("/", userController.create);

module.exports = userRoutes