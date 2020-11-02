const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  text: {type: String, required: true},
  tour: {type: Types.ObjectId, ref: 'Product', required: true},
  rate: {type: Number},
  owner: {type: Types.ObjectId, ref: 'User', required: true},
  ownerName: {type: String},
  date: {type: Date, default: Date.now}
})

module.exports = model('Review', schema);