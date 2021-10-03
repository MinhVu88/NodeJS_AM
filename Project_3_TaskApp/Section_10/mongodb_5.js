const {MongoClient, ObjectID} = require('mongodb'),
       conn_url = 'mongodb://127.0.0.1:27017',
       db_name='task_manager';

MongoClient.connect(conn_url, {useUnifiedTopology: true}, (error, client) => {
    if(error) return console.log('Unable to connect to the task_manager database');
    
    const db = client.db(db_name);

    db.collection('users').deleteMany({age: 53}).then(result => console.log(result)).catch(error => console.log(error));

    db.collection('users').deleteOne({name: 'Layne Staley'}).then(result => console.log(result)).catch(error => console.log(error));
});