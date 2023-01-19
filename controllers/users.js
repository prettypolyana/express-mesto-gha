const User = require('../models/user');
const { VALIDATION_ERROR_CODE, NOT_FOUND_ERROR_CODE, DEFAULT_ERROR_CODE } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateProfileInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь по указанному _id не найден' });
      } else if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь по указанному _id не найден' });
      } else if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfileInfo,
  updateAvatar,
};
