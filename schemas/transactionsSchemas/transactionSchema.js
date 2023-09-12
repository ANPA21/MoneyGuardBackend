const { Schema } = require('mongoose');

const { handleSaveErrors } = require('../../helpers');

const transactionSchema = new Schema(
  {
    comment: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    type: {
      type: String,
      enum: ['expense', 'income'],
      default: 'income',
    },
    category: {
      type: String,
      ref: 'category',
      required: function () {
        return this.type === 'expense';
      },
      enum: [
        'Main expenses',
        'Products',
        'Car',
        'Self care',
        'Child care',
        'Household products',
        'Education',
        'Leisure',
        'Other expenses',
        'Entertainment',
      ],
    },
    value: {
      type: Number,
      min: 0,
      required: [true, 'Funds value is required'],
    },
    date: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

transactionSchema.post('save', handleSaveErrors);

module.exports = transactionSchema;
