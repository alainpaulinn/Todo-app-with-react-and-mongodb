import mongodb from 'mongodb';

const connectionString = 'mongodb://programing-and-archi-labs:yEknIuONUP1KkSDUfJs5g6sXa8y12lI1yyWjsIYIdgrKO7xHnXl7sBkO6b0eRBnTtr848qHAle2T8K3f77t1Xg==@programing-and-archi-labs.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@programing-and-archi-labs@';

if (!connectionString) {
    throw new Error(
        'You must set up the MONGODB_CONNECTION_STRING process variable.',
    );
}

const client = new mongodb.MongoClient(connectionString, {
    useUnifiedTopology: true,
});

export const getCollection = (name) => client.db('labs').collection(name);

export default client;