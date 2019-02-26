import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

let Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'name is required']
  },
  price: {
    type: Number,
    required: [true, 'price is required']
  },
  description: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

productSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique'
});

export default mongoose.model('Product', productSchema);
