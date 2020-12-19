const fs = require('fs');

const data_buffer = fs.readFileSync('book.json');

console.log(data_buffer);

const book_json = data_buffer.toString();

console.log(book_json);

const book_object = JSON.parse(book_json);

console.log('Book:', book_object.title,' - Author:',book_object.author);