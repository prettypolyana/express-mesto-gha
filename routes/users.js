const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  getProfileInfo,
  updateProfileInfo,
  updateAvatar,
} = require('../controllers/users');

const { URL_REGEX } = require('../utils/constants');

router.get('/', getUsers);
router.get('/me', getProfileInfo);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().max(24).hex(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfileInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(URL_REGEX),
  }),
}), updateAvatar);

module.exports = router;
