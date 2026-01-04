const logRequest = (req, res, next) => {
  console.log("Terjadi Request pada Path:", req.path);
  next();
};
module.exports = logRequest;
