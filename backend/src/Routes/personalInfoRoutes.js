const express = require("express");
const router = express.Router();
const personalInfoService = require("../Services/personalInfoService");
const { verifyHREmployee, verifyEmployee } = require("../middleware/auth");

router.get("/:id", verifyHREmployee, personalInfoService.getPersonalInfoById);
router.put("/:id", verifyEmployee, personalInfoService.updatePersonalInfo);

module.exports = router;
