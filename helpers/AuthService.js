const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = {
  authenticate,
};

async function authenticate(email, pswd) {
  const user = await User.findOne({ email });

  if (!user) return false;

  const passwordsMatch = await bcrypt.compare(pswd, user.password);

  if (!passwordsMatch) return false;

  const { password, ...rest } = user.toObject();

  return rest;
}
