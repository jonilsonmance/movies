const {Router} = require("express");
const NotesController = require('../controllers/notes.controller');

const notesRoutes  = Router()
const notesController = new NotesController()

notesRoutes.post("/:user_id", notesController.create);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes