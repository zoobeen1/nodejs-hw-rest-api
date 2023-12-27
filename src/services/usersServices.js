const { User } = require('../models');
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
exports.loginUser = (data) =>
  User.findOne({
    email: data,
  });
