const statusCodes = {
  400: 'Bad request',
  401: 'Unauthorised',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};
const httpError = (status, message = statusCodes[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
module.exports = httpError;
