const { MongoClient } = require('mongodb');

const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function checkLogin(){
  //check username and password
  //redirect to home screen
}

async function createLogin(){
  //log credentials in database
  //check to make sure username isn't taken
  //redirect to home screen
}

async function addPost() {
  //add post to database
}

async function loadPost() {
  //load posts from database
}