const Card = require('../models/card');

const { VALIDATION_ERROR_CODE, NOT_FOUND_ERROR_CODE, DEFAULT_ERROR_CODE } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Передан некорректный _id карточки' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

const addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка с указанным _id не найдена' });
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Передан некорректный _id карточки' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Карточка с указанным _id не найдена' });
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Передан некорректный _id карточки' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
