const { model, Schema } = require('mongoose');
const { genSalt, hash, compare } = require('bcrypt');
const crypto = require('crypto');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// mongoose hook - pre (on save and create)
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    const emailHash = crypto
      .createHash('md5')
      .update(this.email)
      .digest('hex');
    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=monsterid`;
  }
  // Zasolka passworda
  if (!this.isModified('password')) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

userSchema.methods.checkPassword = function (candidat) {
  return compare(candidat, this.password);
};

const User = model('User', userSchema);

module.exports = User;
