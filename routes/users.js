const router = require('express').Router();
const users = require('../data/users.json');

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item._id === id);
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }

  res.status(200).send(user);
});

module.exports = router;
