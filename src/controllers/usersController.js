const { catchAsync } = require('../utils');
const { User } = require('../models');

exports.addUser = catchAsync(async (req, res) => {
  // ToDo - Zasolka parolia
  const { email, subscription } = await User.create(req.body);
  res.status(201).json({ user: { email, subscription } });
});

exports.loginUser = catchAsync(async (req, res) => {
  // ToDo - Add token to user
  const { email, subscription } = await User.findOne({ email: req.user.email });
  res.status(201).json({ Message: 'Success', user: { email, subscription } });
});
