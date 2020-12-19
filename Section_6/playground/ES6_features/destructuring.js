// object destructuring
const person = {
    name: 'Никола Тесла',
    age: 86,
    birthplace: 'Croatia',
    fav_num: 369
};

const {name, fav_num} = person;

console.log(`The scientist's name: ${name} | his/her fav number: ${fav_num}`);

const {name: full_name, inventions} = person;

console.log(`The scientist's full name: ${full_name} | his/her inventions: ${inventions}`);

const {age, patents = 300} = person;

console.log(`The scientist's age: ${age} | he/she had around ${patents} patents`);

const {birthplace = 'Serbia'} = person;

console.log(`The scientist's birthplace is ${birthplace}`);

// apply default parameters with destructuring
const profile_0 = (profession, {name, age, fav_num} = {}) => 
                console.log(`1 of ${name}'s professions is ${profession}. He died at the age of ${age} & his fav number is ${fav_num}`);

profile_0('electrical engineering', person);

profile_0('mechanical engineer');

const profile_1 = (profession, {name='Nikola Tesla', age, fav_num} = {}) => 
                console.log(`1 of ${name}'s professions is ${profession}. He died at the age of ${age} & his fav number is ${fav_num}`);

profile_1('scientist');