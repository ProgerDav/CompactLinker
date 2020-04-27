const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = class TokenGenerator {
  publicKey = "";
  privateKey = "";
  options = {};

  constructor(publicKey, privateKey, options) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.options = options;
  }

  sign = (payload, signOptions) => {
    return jwt.sign(payload, this.privateKey, {
      ...this.options,
      ...signOptions,
    });
  };

  refresh = (token, refreshOptions) => {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // const payload = jwt.verify(token, this.publicKey);

    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti;

    const jwtSignOptions = { ...this.options, jwtid: refreshOptions.jwtid };

    // return this.sign({ userId: "5e836c8b40b84d11fcc7c6d4" });

    return jwt.sign(payload, this.privateKey, jwtSignOptions);
  };
};
