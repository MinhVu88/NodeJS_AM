const fs = require('fs');

const book = {
    title: 'Animal Farm',
    author: 'George Orwell'
};

const book_json = JSON.stringify(book);

fs.writeFileSync('book.json', book_json);