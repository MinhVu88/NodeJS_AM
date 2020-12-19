const mongoose = require('mongoose'),
      conn_url = 'mongodb://127.0.0.1:27017/task_manager_mongoose';

// useCreateIndex makes sure that when mongoose works with mongodb, our indexes are created for us to quickly access the data
mongoose.connect(conn_url, {useCreateIndex: true, 
                            useNewUrlParser: true, 
                            useUnifiedTopology: true, 
                            useFindAndModify: false});

// const user_0 = new User({name: 'Heinrich Himmler', age: 45, email: 'himmler@3rdreich.de', password: '1234567'});
// user_0.save().then(userModelInstance => console.log(userModelInstance)).catch(error => console.log(error));

// // default age
// const user_1 = new User({name: 'Reinhard Heydrich', email: 'heydrich@3rdreich.de', password: '1234567'}); 
// user_1.save().then(userModelInstance => console.log(userModelInstance)).catch(error => console.log(error));

// // invalid age
// const user_2 = new User({name: 'Joseph Goebbels', age: -27, email: 'goebbels@3rdreich.de', password: '1234567'}); 
// user_2.save().then(userModelInstance => console.log(userModelInstance)).catch(error => console.log(error));

// // invalid email
// const user_3 = new User({name: 'Martin Bormann', age: 35, email: 'bormann@', password: '1234567'}); 
// user_3.save().then(userModelInstance => console.log(userModelInstance)).catch(error => console.log(error));

// // trim name, email & lowercase email
// const user_4 = new User({name: '   Albert Speer   ', age: 23, email: '   SPEER@3RDREICH.DE   ', password: '   1234567   '});
// user_4.save().then(userModelInstance => console.log(userModelInstance)).catch(error => console.log(error));

// // invalid password
// const user_5 = new User({name: 'Hermann Göring', email: 'goring@3rdreich.de', password: '   passwo   '});
// user_5.save().then(userModelInstance => console.log(userModelInstance)).catch(error => console.log(error));