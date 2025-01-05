var mongoose = require("mongoose"),
  Joi = require("joi");
const initializeAutoIncrement = require("../utils/autoIncrement");
var workExperienceSchema = new mongoose.Schema({
  CompanyName: { type: String, required: true },
  Designation: { type: String, required: true },
  FromDate: { type: Date, required: true },
  ToDate: { type: Date, required: true },
});
const autoIncrement = initializeAutoIncrement(mongoose.connection);
workExperienceSchema.plugin(autoIncrement.plugin, {
  model: "WorkExperience",
  field: "WorkExperienceID",
});

var WorkExperience = mongoose.model("WorkExperience", workExperienceSchema);

const WorkExperienceValidation = Joi.object().keys({
  CompanyName: Joi.string().max(200).required(),
  Designation: Joi.string().max(200).required(),
  FromDate: Joi.date().required(),
  ToDate: Joi.date().required(),
});

module.exports = { WorkExperience, WorkExperienceValidation };