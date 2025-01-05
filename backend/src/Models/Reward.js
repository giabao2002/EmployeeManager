var mongoose = require("mongoose"),
  Joi = require("joi");
const initializeAutoIncrement = require("../utils/autoIncrement");
var rewardSchema = new mongoose.Schema({
  Type: { type: Number, required: true, enum: [1, 2] },
  Description: { type: String, required: true },
  Date: { type: Date, required: true },
  Amount: { type: Number, required: true },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
});
const autoIncrement = initializeAutoIncrement(mongoose.connection);
rewardSchema.plugin(autoIncrement.plugin, {
  model: "Reward",
  field: "RewardID",
});

var Reward = mongoose.model("Reward", rewardSchema);

const RewardValidation = Joi.object().keys({
  Type: Joi.number().valid(1, 2).required(),
  Description: Joi.string().max(1000).required(),
  Date: Joi.date().required(),
  Amount: Joi.number().required(),
  employee: Joi.required(),
});

module.exports = { Reward, RewardValidation };