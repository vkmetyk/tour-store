const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  owner: {type: Types.ObjectId, ref: 'User'},
  products: {type: Array, required: true},
  date: {type: Date, default: Date.now}
})

module.exports = model('Order', schema);