const greet_0 = name => console.log('Good morning,',name);

greet_0('Edward Norton');

greet_0();

// using a default value for the name param
const greet_1 = (name = 'anon') => console.log('Good afternoon,',name);

greet_1('Clint Eastwood');

greet_1();