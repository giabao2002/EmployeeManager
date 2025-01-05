var mongoose = require("mongoose"),
  Joi = require("joi");
const initializeAutoIncrement = require("../utils/autoIncrement");
var complaintSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Date: { type: Date, required: true },
  Status: { type: String, required: true, default: "Pending" },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});
const autoIncrement = initializeAutoIncrement(mongoose.connection);
complaintSchema.plugin(autoIncrement.plugin, {
  model: "Complaint",
  field: "ComplaintID",
});

var Complaint = mongoose.model("Complaint", complaintSchema);

const ComplaintValidation = Joi.object().keys({
  Title: Joi.string().max(200).required(),
  Description: Joi.string().max(1000).required(),
  Date: Joi.date().required(),
  Status: Joi.string().max(100).required(),
  employee: Joi.required(),
});
module.exports = { Complaint, ComplaintValidation };