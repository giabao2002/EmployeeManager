var mongoose = require("mongoose"),
  Joi = require("joi");
const initializeAutoIncrement = require("../utils/autoIncrement");

var employeeSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  MiddleName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Gender: { type: String, required: true },
  DOB: { type: Date, required: true },
  DateOfJoining: { type: Date },
  TerminateDate: { type: Date },
  Deleted: { type: Boolean },
  Photo: { type: String },
  ContactNo: { type: String, required: true },
  EmployeeCode: { type: String, required: true },
  Account: { type: Number, required: true },
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
  salary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Salary" }],
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
  familyInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "FamilyInfo" }],
  workExperience: [
    { type: mongoose.Schema.Types.ObjectId, ref: "WorkExperience" },
  ],
  leaveApplication: [
    { type: mongoose.Schema.Types.ObjectId, ref: "LeaveApplication" },
  ],
  BloodGroup: { type: String },
  EmergencyContactNo: { type: String },
  Hobbies: { type: String },
  PANcardNo: { type: String },
  PermanetAddress: { type: String },
  PresentAddress: { type: String },
  Status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

const autoIncrement = initializeAutoIncrement(mongoose.connection);
employeeSchema.plugin(autoIncrement.plugin, {
  model: "Employee",
  field: "EmployeeID",
});

var Employee = mongoose.model("Employee", employeeSchema);

const EmployeeValidation = Joi.object().keys({
  RoleID: Joi.optional(),
  DepartmentID: Joi.optional(),
  SalaryID: Joi.optional(),
  FirstName: Joi.string().max(200).required(),
  MiddleName: Joi.string().max(200).required(),
  LastName: Joi.string().max(200).required(),
  Email: Joi.string().max(200).required(),
  Password: Joi.string().max(100).required(),
  Gender: Joi.string().max(100).required(),
  DOB: Joi.date().required(),
  DateOfJoining: Joi.date().optional(),
  TerminateDate: Joi.date().optional(),
  Deleted: Joi.optional(),
  Photo: Joi.optional(),
  ContactNo: Joi.string().max(20).required(),
  EmployeeCode: Joi.string().max(100).required(),
  Account: Joi.number().max(3).required(),
  Status: Joi.string().valid("Active", "Inactive").optional(),
});
const EmployeeValidationUpdate = Joi.object().keys({
  RoleID: Joi.optional(),
  DepartmentID: Joi.optional(),
  SalaryID: Joi.optional(),
  FirstName: Joi.string().max(200).required(),
  MiddleName: Joi.string().max(200).required(),
  LastName: Joi.string().max(200).required(),
  Email: Joi.string().max(200).required(),
  Gender: Joi.string().max(100).required(),
  DOB: Joi.date().required(),
  DateOfJoining: Joi.date().optional(),
  TerminateDate: Joi.date().optional(),
  Deleted: Joi.optional(),
  Photo: Joi.optional(),
  ContactNo: Joi.string().max(20).required(),
  EmployeeCode: Joi.string().max(100).required(),
  Account: Joi.number().max(3).required(),
  Status: Joi.string().valid("Active", "Inactive").optional(),
});

const EmployeePersonalInfoValidation = Joi.object().keys({
  BloodGroup: Joi.string().max(10).allow("").optional(),
  DOB: Joi.date().optional(),
  ContactNo: Joi.string().max(20).allow("").optional(),
  Email: Joi.string().max(200).required(),
  EmergencyContactNo: Joi.string().max(20).allow("").optional(),
  Gender: Joi.string().max(100).allow("").optional(),
  Hobbies: Joi.string().max(1000).allow("").optional(),
  PANcardNo: Joi.string().max(50).allow("").optional(),
  PermanetAddress: Joi.string().max(200).allow("").optional(),
  PresentAddress: Joi.string().max(200).allow("").optional(),
});

module.exports = {
  Employee,
  EmployeeValidation,
  EmployeeValidationUpdate,
  EmployeePersonalInfoValidation,
};
