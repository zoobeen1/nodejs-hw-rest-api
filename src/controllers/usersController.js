const { userService, ImageService } = require('../services');
const { catchAsync, httpError } = require('../utils');

exports.add = catchAsync(async (req, res) => {
  const { email } = req.body;
  const token = userService.tokenGenerator(email);
  await userService.sendVerificationEmail({ token, email });
  const { subscription } = await userService.createUser({
    ...req.body,
    verificationToken: token,
  });
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
exports.verification = catchAsync(async (req, res) => {
  const token = req.params.verificationToken;
  console.log(token);
  if (!token) {
    throw httpError(404);
    return;
  }
  const ver = await userService.emailVerify(
    req.params.verificationToken
  );

  if (!ver) {
    throw httpError(404, 'User not found!');
    return;
  }
  res.status(200).json({ message: 'Verification successful' });
});
