const db = require('./connection');
const joi = require('joi');
const messages = db.get('messages');

// username, subject and message are all required but imageURL is optional
const schema = joi.object().keys({
  username: joi.string().alphanum().required(),
  subject: joi.string().required(),
  message: joi.string().max(500).required(),
  imageURL: joi.string().uri({
    scheme:[
      /https?/
    ]
  })
});

function getAll() {
  return messages.find();
}

// create message and validate its
function create(message) {
  if(!message.username) message.username = 'Anonymous';
  const result = joi.validate(message, schema);
  if(result.err == null) {
    message.created = new Date();
    return messages.insert(message);
  } else {
    return Promise.reject(result.err);
  }
}

module.exports = {
  getAll,
  create
}
