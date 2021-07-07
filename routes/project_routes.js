const express = require("express");
const router = express.Router();
const projectController = require('../controllers/project_controller');
router.post("/", projectController.create);
router.get("/", projectController.findAll);
router.get("/:id", projectController.findOne);
router.put("/:id", projectController.UpdateProject);
router.delete("/:id", projectController.delete);


module.exports = router;