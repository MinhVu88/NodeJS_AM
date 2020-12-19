const {MongoClient, ObjectID} = require('mongodb'),
       conn_url = 'mongodb://127.0.0.1:27017',
       db_name='task_manager';

MongoClient.connect(conn_url, {useUnifiedTopology: true}, (error, client) => {
    if(error) return console.log('Unable to connect to the task_manager database');
    
    const db = client.db(db_name);

    db.collection('users')
      .updateOne({_id: new ObjectID('5ed9b4c2a2c0af18c031f5c4')}, 
                 {$set: {name: 'James Herbert Keenan'}})
      .then(result => console.log(result)).catch(error => console.log(error));

    db.collection('users')
      .updateOne({_id: new ObjectID('5ed9b4c2a2c0af18c031f5c7')}, 
                 {$inc: {age: 2}})
      .then(result => console.log(result)).catch(error => console.log(error));

    db.collection('tasks')
      .updateMany({completed: false}, 
                  {$set: {completed: true}})
      .then(result => console.log(result.modifiedCount)).catch(error => console.log(error));
});