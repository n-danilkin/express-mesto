const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      } else {
        const token = jwt.sign({ _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' });

        res.send({ token });
      }
    })
    .catch(next);
};
