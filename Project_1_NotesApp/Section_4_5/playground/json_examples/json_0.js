const book = {
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury'
};

const book_json = JSON.stringify(book);

console.log(book_json);

const book_object = JSON.parse(book_json);

console.log('Book:', book_object.title,' - Author:',book_object.author);