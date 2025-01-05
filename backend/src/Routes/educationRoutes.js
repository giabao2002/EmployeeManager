const express = require("express");
const router = express.Router();
const educationService = require("../Services/educationService");
const { verifyEmployee, verifyHREmployee } = require("../middleware/auth");

router.get("/:id", verifyHREmployee, educationService.getEducation);
router.post("/:id", verifyEmployee, educationService.addEducation);
router.put("/:id", verifyEmployee, educationService.updateEducation);
router.delete("/:id/:id2", verifyEmployee, educationService.deleteEducation);

module.exports = router;
