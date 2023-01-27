const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const AccessDeniedError = require('../errors/access-denied-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(next(err));
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else if (req.user._id !== card.owner.toString()) {
        throw new AccessDeniedError('Можно удалять только свои карточки');
      } else {
        Card.deleteOne({ _id: card._id })
          .then(() => {
            res.send(card);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Передан некорректный _id карточки'));
      } else {
        next(err);
      }
    });
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Передан некорректный _id карточки'));
      } else {
        next(err);
      }
    });
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Передан некорректный _id карточки'));
      } else {
        next(err);
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
