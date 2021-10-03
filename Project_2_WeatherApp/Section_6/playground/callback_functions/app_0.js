setTimeout(() => console.log('nothing lasts forever'), 3000);

const names = ['Maynard', 'Adam', 'Danny', 'Justin', 'Paul'];

const short_names = names.filter(name => name.length <= 4);

console.log(short_names);

const geoCode_sync = (location, callback) => {return {latitude: 0, longitude: 0};};

console.log(geoCode_sync('Kyoto'));

const geoCode_async_0 = (location, callback) => {setTimeout(() => {return {latitude: 1, longitude: 1};}, 3000)};

console.log(geoCode_async_0('Tokyo')); // undefined (using callback is the solution)

const geoCode_async_1 = (location, callback) => setTimeout(() => callback({latitude: 2, longitude: 2}), 3000);

geoCode_async_1('Osaka', data => console.log(data)); // return the coordinates