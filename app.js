const express = require('express');

const path = require('path');

const cardsRouter = require('./routes/cards');

const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', cardsRouter);

app.use('/', userRouter);

app.get('*', (req, res) => {
  res.send({ message: 'Запрашиваемый ресурс не найден' }, 404);
});
