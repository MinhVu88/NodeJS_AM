const jwt = require("jsonwebtoken"),
  { User, secret } = require("../models/user");

async function authenticate(request, response, next) {
  try {
    const token = request.header("Authorization").replace("Bearer ", ""),
      decodedTokenPayload = jwt.verify(token, secret),
      user = await User.findOne({ _id: decodedTokenPayload._id, "tokens.token": token });

    console.log(token);

    if (!user) throw new Error();

    request.user = user;
    request.token = token;

    next();
  } catch (error) {
    response.status(401).send({ error: "Plz authenticate" });
  }
}

module.exports = authenticate;
