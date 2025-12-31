const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Name must not exceed 40 characters.'
  })
];

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Email must not exceed 40 characters.'
  }),
  validate({
    validator: 'isEmail',
    message: 'Email must be valid.'
  })
];

const genderValidator = [
  validate({
    validator: 'isIn',
    arguments: [['m', 'f', '']],
    message: 'Gender must be "m", "f" or empty.'
  })
];

// ✅ CLEAN & SAFE SCHEMA
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: nameValidator
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: emailValidator
  },
  age: {
    type: Number,
    min: [5, 'Age must be at least 5.'],
    max: [130, 'Age must be at most 130.']
  },
  gender: {
    type: String,
    validate: genderValidator,
    default: ''
  }
});

UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

module.exports = mongoose.model('user', UserSchema);
