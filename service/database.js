const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');

//mongodb+srv://jdubs:<password>@cluster0.dadcgqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//"hostname": "cluster0.dadcgqt.mongodb.net",
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

const db = client.db('missionaryConnect');
const postCollection = db.collection('posts');
const accounts = db.collection('accounts');
const logins = db.collection('login');

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
  const cursor = postCollection.find(query);
  c = await cursor.toArray();
  return c;
}

async function getAccounts(discussion) {
  j = {}
  const cursor = accounts.find();
  c = await cursor.toArray();
  for (let i = 0; i < c.length; i++) {
    account = c[i];
    j[account.username] = account;
  }
  return j;
}

async function getAccount(username) {
  query = { username: username };
  accountInfo = await accounts.findOne(query);
  return accountInfo;
}

async function getLogin(username) {
  query = { username: username };
  accountInfo = await logins.findOne(query);
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
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    username: username,
    password: passwordHash,
    //token: uuid.v4()
  };
  await logins.insertOne(user);
  return user;
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

module.exports = { getPosts, getAccount, getAccounts, createAccount, createLogin, createPost, getLogin };