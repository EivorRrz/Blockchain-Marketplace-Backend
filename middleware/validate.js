const { validationResult } = require("express-validator");

//Validates if the inputs are correct or not!
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = validateRequest;
