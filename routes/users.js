const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateProfileInfo,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.patch('/me', updateProfileInfo);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
