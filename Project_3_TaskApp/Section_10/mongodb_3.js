const {MongoClient, ObjectID} = require('mongodb'),
       conn_url = 'mongodb://127.0.0.1:27017',
       db_name='task_manager';

MongoClient.connect(conn_url, {useUnifiedTopology: true}, (error, client) => {
    if(error) return console.log('Unable to connect to the task_manager database');
    
    const db = client.db(db_name);
    
    db.collection('users').findOne({name: 'Adam Jones'}, (error, result) => {
        if(error) return console.log('Unable to fetch the result from the users collection');

        console.log(result);
    });

    db.collection('users').findOne({_id: new ObjectID('5ed9b4c2a2c0af18c031f5c6')}, (error, result) => {
        if(error) return console.log('Unable to fetch the result from the users collection');

        console.log(result);
    });

    db.collection('tasks').findOne({_id: new ObjectID('5ed9b916305d9d1af00b92cd')}, (error, result) => {
        if(error) return console.log('Unable to fetch the result from the tasks collection');

        console.log(result);
    });

    db.collection('tasks').find({completed: true}).toArray((error, results) => {
        if(error) return console.log('Unable to fetch the results from the tasks collection');

        console.log(results);
    });

    db.collection('tasks').find({completed: false}).count((error, result) => {
        if(error) return console.log('Unable to count the result(s) from the tasks collection');

        console.log(result);
    });
});