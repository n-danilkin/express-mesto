const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const NotFoundError = require('../errors/not-found-err');
const IncorrectData = require('../errors/incorrect-data');

const getUsers = (req, res, next) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch(next);

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectData('Переданы некорректные данные');
      }
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new IncorrectData('Пользователь с таким email уже зарегистрирован');
      } if (err.name === 'ValidationError') {
        throw new IncorrectData('Переданы некорректные данные');
      }
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
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
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectData('Переданы некорректные данные');
      }
    })
    .then(() => res.send({ message: 'Профиль обновлён' }))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
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
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectData('Переданы некорректные данные');
      }
    })
    .then(() => res.send({ message: 'Аватар обновлён' }))
    .catch(next);
};

module.exports = {
  getUser, getUsers, createUser, updateUserProfile, updateUserAvatar,
};
