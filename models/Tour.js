const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  title: {type: String, required: true},
  short_description: {type: String},
  description: {type: String},
  images: [{type: String}],
  price: {type: Number, required: true},
  owner: {type: Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now},
  category: {type: Types.ObjectId, ref: 'Category'}
});

module.exports = model('Tour', schema);