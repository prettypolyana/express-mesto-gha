const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  getProfileInfo,
  updateProfileInfo,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getProfileInfo);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().regex(/^[a-z0-9]{24}$/i),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfileInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[\d\S]+$/i),
  }),
}), updateAvatar);

module.exports = router;
