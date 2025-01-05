var mongoose = require("mongoose"),
  Joi = require("joi");
const initializeAutoIncrement = require("../utils/autoIncrement");
var departmentSchema = new mongoose.Schema({
  DepartmentName: { type: String, required: true },
});
const autoIncrement = initializeAutoIncrement(mongoose.connection);
departmentSchema.plugin(autoIncrement.plugin, {
  model: "Department",
  field: "DepartmentID",
});

var Department = mongoose.model("Department", departmentSchema);

const DepartmentValidation = Joi.object().keys({
  DepartmentName: Joi.string().max(200).required(),
});
module.exports = { Department, DepartmentValidation };