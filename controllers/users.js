const User = require('../models/user.js');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));

const getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('notValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .orFail(new Error('notValidId'))
    .then(() => res.send({ message: 'Профиль обновлён' }))
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then(() => res.send({ message: 'Аватар обновлён' }))
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      } if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUser, getUsers, createUser, updateUserProfile, updateUserAvatar,
};
