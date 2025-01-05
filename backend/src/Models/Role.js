var mongoose = require("mongoose"),
  Joi = require("joi");
const initializeAutoIncrement = require("../utils/autoIncrement");
var roleSchema = new mongoose.Schema({
  RoleName: { type: String, required: true },
});
const autoIncrement = initializeAutoIncrement(mongoose.connection);
roleSchema.plugin(autoIncrement.plugin, {
  model: "Role",
  field: "RoleID",
});
var Role = mongoose.model("Role", roleSchema);

const RoleValidation = Joi.object().keys({
  RoleName: Joi.string().max(200).required(),
});

module.exports = { Role, RoleValidation };