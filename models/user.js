const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const subscrOptions = ['starter', 'pro', 'business'];

const registerSchema = Joi.object({
  password: Joi.string().min(5).required(),
  // email: Joi.string().email().required(),
  email: Joi.string().pattern(emailRegExp).required(),
  subscription: Joi.string().valid(...subscrOptions),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  token: Joi.string(),
});

const updateSubscrSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscrOptions)
    .required(),
});

const schemas = { registerSchema, loginSchema, updateSubscrSchema };

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 5,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegExp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscrOptions,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
      // default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = {
  schemas,
  User,
};
