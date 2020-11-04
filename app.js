const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/tour', require('./routes/tour.routes'))
app.use('/api/category', require('./routes/category.routes'))
app.use('/api/order', require('./routes/order.routes'))
app.use('/api/review', require('./routes/review.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

function listen() {
  try {
    app.listen(PORT, () => {console.log(`App has been started on port ${PORT}...`)})
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

function connect() {
  setTimeout(() => {
    if (connectionDelay < 100000)
      connectionDelay *= 2;
    return mongoose.connect(config.get('mongoUri'), {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }, connectionDelay)
}

mongoose.connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

let connectionDelay = 100;

connect();