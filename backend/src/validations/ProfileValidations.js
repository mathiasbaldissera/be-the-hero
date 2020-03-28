const { celebrate, Segments, Joi } = require("celebrate");

const get = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
});

module.exports = {
  get
};
