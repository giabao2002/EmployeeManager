const express = require("express");
const router = express.Router();
const familyInfoService = require("../Services/familyInfoService");
const { verifyEmployee, verifyHREmployee } = require("../middleware/auth");

router.get("/:id", verifyHREmployee, familyInfoService.getFamilyInfo);
router.post("/:id", verifyEmployee, familyInfoService.createFamilyInfo);
router.put("/:id", verifyEmployee, familyInfoService.updateFamilyInfo);
router.delete("/:id/:id2", verifyEmployee, familyInfoService.deleteFamilyInfo);

module.exports = router;
