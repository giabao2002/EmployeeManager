var mongoose = require("mongoose"),
  Joi = require("joi");
const initializeAutoIncrement = require("../utils/autoIncrement");
var familyInfoSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Relationship: { type: String, required: true },
  DOB: { type: Date, required: true },
  Occupation: { type: String, required: true },
});
const autoIncrement = initializeAutoIncrement(mongoose.connection);
familyInfoSchema.plugin(autoIncrement.plugin, {
  model: "FamilyInfo",
  field: "FamilyInfoID",
});

var FamilyInfo = mongoose.model("FamilyInfo", familyInfoSchema);

const FamilyInfoValidation = Joi.object().keys({
  Name: Joi.string().max(200).required(),
  Relationship: Joi.string().max(200).required(),
  DOB: Joi.date().required(),
  Occupation: Joi.string().max(100).required(),
});

module.exports = { FamilyInfo, FamilyInfoValidation };