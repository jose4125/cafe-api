import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

let Schema = mongoose.Schema;

let categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

categorySchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique'
});

export default mongoose.model('Category', categorySchema);
