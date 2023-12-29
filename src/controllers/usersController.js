const { userServices } = require('../services');
const { catchAsync } = require('../utils');

exports.add = catchAsync(async (req, res) => {
  const { email, subscription } = await userServices.createUser(
    req.body
  );
  res.status(201).json({ user: { email, subscription } });
});

exports.login = catchAsync(async (req, res) => {
  const { id, email, subscription } = req.user;
  const token = userServices.tokenGenerator(id);
  await userServices.updateUser({ id, token });
  res.status(201).json({ token, user: { email, subscription } });
});
exports.logout = catchAsync(async (req, res) => {
  // ToDo - How remove token!?!
  await userServices.updateUser({ token: null });
  res.status(204).json();
});
exports.current = (req, res) => {
  res.status(200).json(req.user);
};
