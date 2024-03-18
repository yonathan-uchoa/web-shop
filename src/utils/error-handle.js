/**
 *
 * @param {number} status - http request code
 * @param {string} message - message for this error
 * @param {*} data - if have something more to return
 */
export const genericError = (status, message, data = {}) => {
  const response = new Error();
  response.status = status;
  response.message = message;
  response.data = data;
  throw response;
};
