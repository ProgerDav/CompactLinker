const jwt = require("jsonwebtoken");

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
    return jwt.sign(payload, { ...this.options, ...signOptions });
  };

  refresh = (token, refreshOptions) => {
    const payload = jwt.verify(token, this.publicKey, refreshOptions.verify);

    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;
    delete payload.jti;

    const jwtSignOptions = { ...this.options, jwtid: refreshOptions.jwtid };

    return jwt.sign(payload, this.privateKey, jwtSignOptions);
  };
};
