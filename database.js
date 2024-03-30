const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

//mongodb+srv://jdubs:<password>@cluster0.dadcgqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//"hostname": "cluster0.dadcgqt.mongodb.net",
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

const db = client.db('missionaryConnect');
const postCollection = db.collection('posts');
const accounts = db.collection('accounts');
const logins = db.collections('login');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function getPosts(discussion) {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 60);

  const query = { discussion: discussion };
  const options = {
    sort: { date: -1 },
  };
  const cursor = postCollection.find(query, options);
  c = await cursor.toArray();
  return c;
}

async function getAccount(username) {
  query = { username: username };
  accountInfo = await accounts.findOne(query);
  //a = await accountInfo.toArray();
  return accountInfo;
}

async function createAccount(username, firstName, lastName, missionArea, startDate, endDate, phoneNumber, prefix) {
  //add post to database
  const account = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    missionArea: missionArea,
    startDate: startDate,
    endDate: endDate,
    phoneNumber: phoneNumber,
    prefix:prefix
  };
  await accounts.insertOne(account);
}

async function createLogin(username, password) {
  //adds login/password to database
  const login = {
    username: username,
    password: password
  };
  await logins.insertOne(login);
}


async function createPost(discussion, username, date, text) {
  //add post to database
  const post = {
    discussion: discussion,
    username: username,
    date: date,
    text: text
  };
  await postCollection.insertOne(post);
}

async function updateAccount() {

}

module.exports = { getPosts, getAccount, createAccount, createLogin, createPost };