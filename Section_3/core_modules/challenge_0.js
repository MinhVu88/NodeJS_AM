/* Append a msg to notes.txt

    - Use appendFileSync() to append to the file

    - Run the script

    - Check notes.txt to view the appended text
*/
const fs = require('fs');

fs.appendFileSync('notes.txt', '. This is the appended text from challenge.js');

console.log('Done');