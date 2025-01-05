var mongoose = require("mongoose"),
  Joi = require("joi");
const initializeAutoIncrement = require("../utils/autoIncrement");
var salarySchema = new mongoose.Schema({
  BasicSalary: { type: String, required: true },
  BankName: { type: String, required: true },
  AccountNo: { type: String, required: true },
  AccountHolderName: { type: String, required: true },
  IFSCcode: { type: String, required: true },
  TaxDeduction: { type: String, required: true },
  ReceivingDate: { type: Number, required: true }, 
});
const autoIncrement = initializeAutoIncrement(mongoose.connection);
salarySchema.plugin(autoIncrement.plugin, {
  model: "Salary",
  field: "SalaryID",
});

var Salary = mongoose.model("Salary", salarySchema);

const SalaryValidation = Joi.object({
  BasicSalary: Joi.number().required(),
  BankName: Joi.string().required(),
  AccountNo: Joi.string().required(),
  AccountHolderName: Joi.string().required(),
  IFSCcode: Joi.string().required(),
  TaxDeduction: Joi.number().required(),
  ReceivingDate: Joi.number().required()
});

module.exports = { Salary, SalaryValidation };
