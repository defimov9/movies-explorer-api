const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const getUserInfo = (req, res, next) => {
  const { userId } = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
        return;
      }
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const { userId } = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
        return;
      }
      if (err.name === '11000') {
        next(new ConflictError('Пользователь с таким email уже существует.'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
