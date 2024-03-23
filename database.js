const { MongoClient } = require('mongodb');

const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('missionaryConnect');
const postCollection = db.collection('posts');
const accounts = db.collection('accounts')

// (async function testConnection() {
//   await client.connect();
//   await db.command({ ping: 1 });
// })().catch((ex) => {
//   console.log(`Unable to connect to database with ${url} because ${ex.message}`);
//   process.exit(1);
// });

async function getPosts() {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 60);

  const query = { date: { $gt: startDate } };
  const options = {
    sort: { date: -1 },
  };
  const cursor = accounts.find(query, options);
  return cursor.toArray();
}

async function checkLogin(username, password){
  //check username and password
  //redirect to home screen
  const query = { username: usernameToFind, password:password };
  const cursor = accounts.find(query);
  return cursor;
}

async function createLogin(){
  //log credentials in database
  //check to make sure username isn't taken
  //redirect to home screen
}

async function addPost(username, date, service_date, text) {
  //add post to database
  const post = {
    username: username,
    date: date,
    service_data: service_date,
    text: text
  };
  await collection.insertOne(post);
}

