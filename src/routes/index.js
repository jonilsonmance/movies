const { Router } = require("express");
const userRoutes = require("./user.routes");
const notesRoutes = require("./notes.routes")

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/users", userRoutes);
routes.use("/movie_notes", notesRoutes);

module.exports = routes;
