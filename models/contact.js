const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const nameRegExp = /^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)?$/;
const phoneRegExp = /^(\(\d{3}\)\s*\d{3}-\d{4}|\d{5,15})$/;
const statusOptions = [true, false];

const addSchema = Joi.object({
  name: Joi.string().pattern(nameRegExp).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegExp).required(),
  favorite: Joi.boolean().valid(...statusOptions),
});

const updateSchema = Joi.object({
  name: Joi.string().pattern(nameRegExp),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegExp),
  favorite: Joi.boolean().valid(...statusOptions),
}).or('name', 'email', 'phone', 'favorite');

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().valid(...statusOptions),
});

const schemas = { addSchema, updateSchema, updateStatusSchema };

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set <name> for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set <email> for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set <phone> for contact'],
    },
    favorite: {
      type: Boolean,
      enum: statusOptions,
      default: false,
    },
    owner: {
      // new
      type: Schema.Types.ObjectId, // new
      ref: 'user', // new
    }, // new
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
