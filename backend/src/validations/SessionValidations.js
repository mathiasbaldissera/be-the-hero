const { celebrate, Segments, Joi } = require("celebrate");

const post = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
});

module.exports = {
  post
};
