const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  description: {type: String}
})

module.exports = model('Category', schema);