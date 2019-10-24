import mongodb from 'mongodb';

export const createClient = connectionString => {
  const client = new mongodb.MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client;
};
