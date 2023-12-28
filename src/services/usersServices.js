const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { SECRET_KEY } = process.env;
/**
 * Create user service
 * @param {Object} userData
 * @return {Promise<User>}
 * @category services
 * @author ZooBeeN
 */
exports.createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};
exports.updateUser = async (data) => {
  await User.updateOne(data);
};
exports.loginUser = (email) =>
  User.findOne({
    email,
  });
exports.tokenGenerator = (payload) => {
  const token = jwt.sign({ id: payload }, SECRET_KEY, {
    expiresIn: '23h',
  });
  return token;
};
exports.tokenVerify = (token) => {
  try {
    const result = jwt.verify(token, SECRET_KEY);
    return result;
  } catch (err) {
    console.log('Token error!');
    return undefined;
  }
};
