const createError = require("http-errors");

const getUsers = (req, res) => {
  try {
    res.status(200).send({
      message: "Users were returned",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
