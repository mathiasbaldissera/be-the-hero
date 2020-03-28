const { celebrate, Segments, Joi } = require("celebrate");

const post = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  })
});

const get = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
});

const _delete = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
});

module.exports = {
  post,
  get,
  delete: _delete
};
