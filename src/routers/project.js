const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");

router.post("/", projectController.createProject);
router.put("/id", projectController.updateProject);
router.put("/id/finish", projectController.doneProject);
router.delete("/id", projectController.removeProject);


module.exports = router;
