const express = require("express");
const router = express.Router();
const { verifyEmployee, verifyHREmployee } = require("../middleware/auth");
const workExperienceService = require("../Services/workExperienceService");

router.get("/:id", verifyHREmployee, workExperienceService.getWorkExperience);
router.post("/:id", verifyEmployee, workExperienceService.createWorkExperience);
router.put("/:id", verifyEmployee, workExperienceService.updateWorkExperience);
router.delete("/:id/:id2", verifyEmployee, workExperienceService.deleteWorkExperience);

module.exports = router;
