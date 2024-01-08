const { userService, ImageService } = require('../services');
const { catchAsync } = require('../utils');

exports.add = catchAsync(async (req, res) => {
  const { email, subscription } = await userService.createUser(
    req.body
  );
  res.status(201).json({ user: { email, subscription } });
});

exports.login = catchAsync(async (req, res) => {
  const { id, email, subscription } = req.user;
  const token = userService.tokenGenerator(id);
  await userService.updateUser({ id, token });
  res.status(201).json({ token, user: { email, subscription } });
});
exports.logout = catchAsync(async (req, res) => {
  const { id } = req.user;
  await userService.updateUser({ id, token: null });
  res.status(204).json();
});
exports.current = (req, res) => {
  res.status(200).json(req.user);
};
exports.avatar = catchAsync(async (req, res) => {
  const { id } = req.user;
  // const avatarURL = `/avatars/${req.file.filename}`;
  // legends for imageSave: (file, options, pathDetails)
  // legends for options: {maxSize, height, width}
  const avatarURL = await ImageService.imageSave(
    req.file,
    {
      maxSize: 2,
    },
    'avatars',
    id
  );
  await userService.updateUser({
    id,
    avatarURL,
  });
  res.status(200).json({ avatarURL });
});
