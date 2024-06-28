const { Router} = require("express")
const userRoutes = require("./user.routes")
const notesRoutes = require("./note.routes")
const sessions = require("./sessions.routes")

const router = Router()

router.use("/users",userRoutes)
router.use("/movie_notes",notesRoutes)
router.use("/sessions",sessions)

module.exports = router