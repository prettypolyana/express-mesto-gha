const mongoose = require('mongoose');

const { URL_REGEX } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => URL_REGEX.exec(v),
      message: (props) => `${props.value} некорректная ссылка`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: mongoose.Schema.Types.Array,
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: 'date',
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
