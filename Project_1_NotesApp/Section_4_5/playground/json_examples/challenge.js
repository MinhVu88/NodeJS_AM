/* Challenge: work with JSON & the file system

- Load & parse the json data

- Change the name & age properties

- Stringify the changed object & overwrite the original data

- Test your work by viewing data in the json file

+ The original person.json: {"name":"Paul D'Amour","birthplace":"Spokane, Washington","age":53}
*/
const fs = require('fs');

const person_object = JSON.parse(fs.readFileSync('person.json').toString());

person_object.name = 'Justin Chancellor';

person_object.birthplace = 'London, England';

person_object.age = 48;

fs.writeFileSync('person.json', JSON.stringify(person_object));