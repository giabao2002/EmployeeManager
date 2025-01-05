var mongoose = require("mongoose"),
  Joi = require("joi");
const initializeAutoIncrement = require("../utils/autoIncrement");
var leaveApplicationSchema = new mongoose.Schema({
  Leavetype: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true },
  Reasonforleave: { type: String, required: true },
  Status: { type: String, required: true },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});
const autoIncrement = initializeAutoIncrement(mongoose.connection);
leaveApplicationSchema.plugin(autoIncrement.plugin, {
  model: "LeaveApplication",
  field: "LeaveApplicationID",
});

var LeaveApplication = mongoose.model(
  "LeaveApplication",
  leaveApplicationSchema
);

const LeaveApplicationValidation = Joi.object().keys({
  Leavetype: Joi.string().max(100).required(),

  FromDate: Joi.date().required(),
  ToDate: Joi.date().required(),
  Reasonforleave: Joi.string().max(100).required(),
  Status: Joi.number().max(1).required(),
});

module.exports = { LeaveApplication, LeaveApplicationValidation };