const router = require('express').Router();
const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const {
  createUser,
} = require('../controllers/users');

const validateUrl = (v) => {
  if (!validator.isURL(v)) {
    throw new CelebrateError('некорректный url');
  }
  return v;
};

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateUrl),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

module.exports = router;
