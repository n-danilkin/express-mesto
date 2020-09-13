const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => fs.readFile(usersPath)
  .then((users) => res
    .status(200)
    .send(JSON.parse(users)))
  .catch((error) => res
    .status(500)
    .send({ message: error })));

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  return fs.readFile(usersPath)
    .then((users) => {
      const user = users.find((item) => item._id === id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((error) => res
      .status(500)
      .send({ message: error }));
});

module.exports = router;
