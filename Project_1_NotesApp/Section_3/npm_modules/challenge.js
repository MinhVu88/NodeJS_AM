/* Use the chalk lib in challenge.js

- Install version 2.4.1 of chalk

- Load chalk into challenge.js

- Use it to print 'Success!' in green to the console

- Test it

  + Bonus: use docs to mess around with other styles. Ex: make text bold & inversed
*/
const chalk = require('chalk');

console.log(chalk.green.bold.inverse.underline('success!'));