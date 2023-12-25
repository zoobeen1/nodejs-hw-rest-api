const { catchAsync } = require('../utils');
const { User } = require('../models');

exports.addUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  const { email, subscription } = user;
  res.status(201).json({ user: { email, subscription } });
});
