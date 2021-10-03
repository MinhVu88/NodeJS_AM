// perform CRUD operations (create, read, update & delete)
const mongodb = require('mongodb'),
      mongo_client = mongodb.MongoClient,
      conn_url = 'mongodb://127.0.0.1:27017',
      db_name = 'task_manager';

// useNewUrlParser is deprecated
mongo_client.connect(conn_url, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error) return console.log('Unable to connect to the task_manager database');

    console.log('Connected');

    const db = client.db(db_name);

    db.collection('users')
      .insertOne({name: 'Maynard Keenan', birthplace :'Ravenna, Ohio', age: 56}, (error, result) => {
           if(error) return console.log('Unable to insert the new doc to the users collection');

           console.log(result.ops);
    });

    db.collection('users').insertMany([
           {name: 'Adam Jones', birthplace :'Park Ridge, Illinois', age: 55},
           {name: 'Dan Carey', birthplace :'Lawrence, Kansas', age: 59},
           {name: 'Justin Chancellor', birthplace :'London, England', age: 48}
    ], (error, result) => {
        if(error) return console.log('Unable to insert the new docs to the users collection');

        console.log(result.ops);
    });
});