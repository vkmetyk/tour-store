const {Schema, model} = require('mongoose');

const schema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  img: {type: String},
  phone: {type: String},
  role: {type: String, default: 'client'}
});

module.exports = model('User', schema);