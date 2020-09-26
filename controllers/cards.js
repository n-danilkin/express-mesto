const Card = require('../models/card.js');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .orFail(new Error('notValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('notValidId'))
    .then(() => { res.send({ message: 'Карточка удалена' }); })
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('notValidId'))
    .then(() => res.send({ message: 'лайк поставлен' }))
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('notValidId'))
    .then(() => res.send({ message: 'лайк удалён' }))
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
