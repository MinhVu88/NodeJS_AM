const mongodb = require('mongodb'),
      mongo_client = mongodb.MongoClient,
      conn_url = 'mongodb://127.0.0.1:27017',
      db_name='task_manager';

mongo_client.connect(conn_url, {useUnifiedTopology: true}, (error, client) => {
    if(error) return console.log('Unable to connect to the task_manager database');

    console.log('Connected');

    const db = client.db(db_name);

    db.collection('tasks').insertMany([
        {description: 'task 1', completed: true}, 
        {description: 'task 2', completed: false}, 
        {description: 'task 3', completed: true}
    ], (error, result) => {
        if(error) return console.log('Unable to add the new docs to the tasks collection');

        console.log(result.ops);
    });
});