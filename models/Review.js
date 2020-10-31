const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  text: {type: String, required: true},
  product: {type: Types.ObjectId, ref: 'Product'},
  owner: {type: Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now}
})

module.exports = model('Review', schema);