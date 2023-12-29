const Joi = require('joi');
const { regex, enums } = require('../constants');

exports.createUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: {
            allow: ['com', 'net', 'ua', 'ru'],
          },
        })
        .required(),
      password: Joi.string().regex(regex.PASSWORD_REGEX).required(),
      subscription: Joi.string().valid(
        ...Object.values(enums.userSubscriptionEnum)
      ),
    })

    .validate(data);
