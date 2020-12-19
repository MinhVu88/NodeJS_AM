const {MongoClient, ObjectID} = require('mongodb'),
       conn_url = 'mongodb://127.0.0.1:27017',
       db_name='task_manager';

const id = new ObjectID();

console.log(id,'|',id.getTimestamp(),'|',id.id,'|',id.id.length,'|',id.toHexString(),'|',id.toHexString().length);

MongoClient.connect(conn_url, {useUnifiedTopology: true}, (error, client) => {
    if(error) return console.log('Unable to connect to the task_manager database');

    const db = client.db(db_name);

    db.collection('users').insertOne({_id: id, name: 'Paul D\'Amour', birthplace :'Spokane, Washington', age: 53}, (error, result) => {
        if(error) return console.log('Unable to insert the new doc to the users collection');

        console.log(result.ops);
    });
});