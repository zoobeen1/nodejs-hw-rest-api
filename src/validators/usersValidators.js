const Joi = require('joi');

exports.createUserValidator = (data) =>
  Joi.object()
    .keys({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'ua', 'ru'] },
        })
        .required(),
      password: Joi.string().min(8).max(30).required(),
    })
    .validate(data);
