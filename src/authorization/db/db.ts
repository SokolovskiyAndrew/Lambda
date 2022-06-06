import { Collection, Db, MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const client = new MongoClient(process.env.MONGO_URI as string);

const dbName = 'Auth';
export let db: Db;
export let Users: Collection;
export let Tokens: Collection;

export const connectDB = async (inDbName: string = dbName): Promise<void> => {
  await client.connect();
  console.log('Connected successfully to server');
  db = client.db(inDbName);
  Users = db.collection('Users');
  Tokens = db.collection('Tokens');
};
