const express = require("express");
const router = express.Router();
const salaryService = require("../Services/salaryService");
const { verifyHR, verifyEmployee, verifyAdminHR } = require("../middleware/auth");

router.get("/", verifyAdminHR, salaryService.getAllSalaries);
router.get("/:employeeCode", verifyHR, salaryService.getSalaryByEmployeeCode);
router.get("/employee/:id", verifyEmployee, salaryService.getSalaryById);
router.post("/:id", verifyAdminHR, salaryService.createSalary);
router.put("/:id", verifyAdminHR, salaryService.updateSalary);
router.delete("/:id", verifyHR, salaryService.deleteSalary);

module.exports = router;
