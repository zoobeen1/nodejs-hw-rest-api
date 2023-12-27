const { catchAsync } = require('../utils');
const { userServices } = require('../services');

exports.add = catchAsync(async (req, res) => {
  const newUser = await userServices.createUser(req.body);
  res.status(201).json({ user: newUser });
});

exports.login = (req, res) => {
  // ToDo - Add token to user

  const { email, subscription } = req.user;
  res
    .status(201)
    .json({ token: 'In process', user: { email, subscription } });
};
