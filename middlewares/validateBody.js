const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
     
      return next(HttpError(400, 'Bad Request'));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
