const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const User = require('../models/user');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      } else {
        const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

        res.send({ token });
      }
    })
    .catch(next);
};
