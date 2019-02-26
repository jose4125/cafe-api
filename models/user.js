import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import validator from 'validator';

const roles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not a valid role'
};

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: roles
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.toJSON = function() {
  let user = this;
  let userObj = user.toObject();
  delete userObj.password;

  return userObj;
};

userSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique'
});

export default mongoose.model('User', userSchema);
