class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
const statusCodes = [];
const httpError = (status, message = statusCodes[status]) => {};
module.exports = { HttpError, httpError };
