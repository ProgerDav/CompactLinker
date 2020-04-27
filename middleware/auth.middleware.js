const { authenticate } = require("../helpers/AuthService");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Basic") === -1
    )
      return res.status(401).json({ message: "No Auth header specified" });

    const credentials = req.headers.authorization.split(" ")[1];
    const [email, password] = Buffer.from(credentials, "base64")
      .toString("ascii")
      .split(":");

    const user = await authenticate(email, password);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.user = user;

    next();
  } catch (e) {
    res.status(401).json({
      message: "Unauthenticated",
    });
  }
};
