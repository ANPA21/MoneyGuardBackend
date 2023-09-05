const { Schema } = require("mongoose");

const { handleSaveErrors } = require("../../helpers");

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
        "Products",
        "Car",
        "Main expenses",
        "Education",
        "Entertainment",
        "Self care",
        "Leisure",
        "Other expenses",
        "Education",
        "Household products",
      ],
    },
    money: {
      type: Number,
      min: 0,
      required: [true, "Funds value is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

transactionSchema.post("save", handleSaveErrors);

module.exports = transactionSchema;
