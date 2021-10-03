const jwt = require("jsonwebtoken");

function testJWT() {
  const secret = "areyouaoneorazero",
    token = jwt.sign({ _id: "Tool101" }, secret, { expiresIn: "0 seconds" }),
    data = jwt.verify(token, secret);

  console.log(token, "|", data);
}

testJWT();
