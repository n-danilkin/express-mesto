const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cardsRouter = require('./routes/cards');

const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: '5f6df8c2ee028b3e209e0a68',
  };

  next();
});

app.use('/', cardsRouter);

app.use('/', userRouter);

app.get('*', (req, res) => {
  res.send({ message: 'Запрашиваемый ресурс не найден' }, 404);
});
