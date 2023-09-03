const { Schema, model } = require('mongoose');
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const transactionSchema = new Schema(
    {
        balance: { type: Number },
        date: {
            type: String,
            default: new Date().toLocaleDateString(),
        },
        month: {
            type: String,
            default: new Date().toLocaleDateString().slice(3, 5),
        },
        year: {
            type: String,
            default: new Date().toLocaleDateString().slice(6),
        },
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
            enum: ['spend', 'income'],
            default: 'income',
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'category',
            required: true,
            enum: ['products', 'car', 'main expenses', 'education', 'entertainment', 'self care', 'leisure', 'other expenses', 'education', 'household products', 'expenses', 'income'],
        },
        money: {
            type: Number,
            min: 0,
            required: [true, 'Money is required'],
        },
    },
    { versionKey: false, timestamps: true },
);

transactionSchema.post("save", handleSaveErrors)

const addSchema = Joi.object({
    balance: Joi.number(),
    date: Joi.string(),
    month: Joi.string(),
    year: Joi.string(),
    comment: Joi.string(),
    type: Joi.string().valid('spend', 'income').required(),
    category: Joi.when('type', {
        is: 'spend',
        then: Joi.string().required(),
        otherwise: Joi.forbidden(), // Если type !== 'spend', то category не должен быть
    }),
    money: Joi.number().min(0).required(),
})

const schemas = {
    addSchema
}

const Transaction = model('transactions', transactionSchema);



module.exports = {
    Transaction,
    schemas,
};