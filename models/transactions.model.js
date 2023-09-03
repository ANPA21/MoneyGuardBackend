const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const transactionSchema = new Schema(
  {
    balance: { type: Number },
    comment: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: ["expense", "income"],
      default: "income",
    },
    category: {
      type: String,
      ref: "category",
      required: function () {
        return this.type === "expense";
      },
      enum: [
        "products",
        "car",
        "main expenses",
        "education",
        "entertainment",
        "self care",
        "leisure",
        "other expenses",
        "education",
        "household products",
      ],
    },
    value: {
      type: Number,
      min: 0,
      required: [true, "Funds value is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

transactionSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  balance: Joi.number(),
  date: Joi.string(),
  month: Joi.string(),
  year: Joi.string(),
  comment: Joi.string(),
  type: Joi.string().valid("expense", "income").required(),
  category: Joi.when("type", {
    is: "expense",
    then: Joi.string().required(),
    otherwise: Joi.forbidden(), // Если type !== 'expense', то category не должен быть
  }),
  money: Joi.number().min(0).required(),
});

const schemas = {
  addSchema,
};

const Transaction = model("transactions", transactionSchema);

module.exports = {
  Transaction,
  schemas,
};
