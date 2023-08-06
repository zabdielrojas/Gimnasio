const { notFoundError } = require("../../services/errorService");

const notFound = (req, res, next) => {
  //console.log("NOT FOUNND");
  next(notFoundError());
};

module.exports = notFound;
