const Card = require('../models/card.js');
const NotFoundError = require('../errors/not-found-err');
const IncorrectData = require('../errors/incorrect-data');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectData('Переданы некорректные данные');
      }
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => { res.send({ message: 'Карточка удалена' }); })
          .catch(next);
      } else {
        res.send({ message: 'Вы не можете удалить чужую карточку' });
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then(() => res.send({ message: 'лайк поставлен' }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then(() => res.send({ message: 'лайк удалён' }))
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
