const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { sendEmail } = require('./emailService');

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
  const { id, ...restData } = data;
  await User.updateOne({ _id: id }, { ...restData });
};
exports.loginUser = (email) =>
  User.findOne({
    email,
  });
exports.tokenGenerator = (payload) => {
  const token = jwt.sign({ id: payload }, SECRET_KEY, {
    expiresIn: '2h',
  });
  return token;
};
exports.tokenVerify = (token) => {
  try {
    const result = jwt.verify(token, SECRET_KEY);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
exports.sendVerificationEmail = (data) => {
  console.log(data);
  return sendEmail(data);
};

exports.emailVerify = async (token) => {
  try {
    const user = await User.findOne({ verificationToken: token });

    if (user) {
      user.verificationToken = null;
      user.verify = true;
      user.save();
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
