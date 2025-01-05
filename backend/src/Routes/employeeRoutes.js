const express = require("express");
const router = express.Router();
const employeeService = require("../Services/employeeService");
const { verifyHR, verifyAdminHR } = require("../middleware/auth");

router.get("/", verifyAdminHR, employeeService.getAllEmployees);
router.post("/", verifyHR, employeeService.createEmployee);
router.put("/:id", verifyHR, employeeService.updateEmployee);
router.put("/status/:id", verifyHR, employeeService.updateEmployeeStatus);
router.delete("/:id", verifyHR, employeeService.deleteEmployee);
router.post("/search", verifyHR, employeeService.searchEmployees);

module.exports = router;
