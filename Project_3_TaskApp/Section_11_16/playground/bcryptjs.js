const bcryptjs = require("bcryptjs");

async function testBcryptjs() {
  /* 
        - Encryption algorithm is reversible, hashing algorithm (bcryptjs) is not.
        
        - To compare the user-defined plain-text pw with the hashed one in the db, 
          bcryptjs hashes the plain-text pw & then perform the comparison
       */
  const plainTextPassword_0 = "abc123*",
    plainTextPassword_1 = "aBc123*";

  const hashedPassword = await bcryptjs.hash(plainTextPassword_0, 8);

  const isIdentical_0 = await bcryptjs.compare(plainTextPassword_0, hashedPassword);

  const isIdentical_1 = await bcryptjs.compare(plainTextPassword_1, hashedPassword);

  console.log(`Plain text pw: ${plainTextPassword_0} -> Hashed pw: ${hashedPassword} | ${isIdentical_0} | ${isIdentical_1}`);
}

testBcryptjs();
