const express = require('express');
const app = express();
const DB = require('./database.js');
const bcrypt = require('bcrypt');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());
// Serve up the front-end static content hosting
app.use(express.static('public'));
// Router for service endpoints
var apiRouter = express.Router();
app.use('/api', apiRouter);

//get
apiRouter.get('/account/:username', async (_req, res) => {
  const account = await DB.getAccount(_req.params.username);
  res.send(account);
});
apiRouter.get('/posts/:discussion', async (_req, res) => {
  const posts = await DB.getPosts(_req.params.discussion);
  res.send(posts);
});

// post
apiRouter.post('/post', async (req, res) => {
  info = { ...req.body};
  await DB.createPost(info["discussion"], info["username"], info["date"], info["text"]);
  res.status(201).send("Post created");
});

apiRouter.post('/createAccount', async (req, res) => {
  //const { username, firstName, lastName, missionArea, startDate, endDate, phoneNumber, prefix } = req.body;
  info = { ...req.body};
  await DB.createAccount(info["username"], info["firstName"], info["lastName"], info["missionArea"], info["startDate"], info["endDate"], info["phoneNumber"], info["prefix"]);
  res.status(201).send("Account created");
  //res.send(account);
});



//login service
// createAuthorization from the given credentials
apiRouter.post('/auth/create', async (req, res) => {
  body = { ...req.body};
  
  if (await DB.getAccount(req.body['username'])) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    //create account
    const user = await DB.createAccount(body["username"], body["firstName"], body["lastName"], body["missionArea"], body["startDate"], body["endDate"], body["phoneNumber"], body["prefix"]);
    //setAuthCookie(res, user.token);

    //create login
    const userLogin = await DB.createLogin(body['username'], body['password']);
    console.log('Boom baby');
    res.status(409).send({username: body['username']});
    // res.send({
    //   id: user._id,
    // });
  }
});

// loginAuthorization from the given credentials
apiRouter.post('/auth/login', async (req, res) => {
  body = { ...req.body};

  const user = await DB.getLogin(body['username']);
  console.log(user);
  if (user) {
    const passwordHash = await bcrypt.hash(user['password'], 10);
    console.log(passwordHash);
    const passwordMatch = await bcrypt.compare(user['password'], body['password']);
    if (passwordMatch) {
      console.log('Success I think')
      //setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  console.log('Uhhhh');
  res.status(401).send({ msg: 'Unauthorized' });
});

// getMe for the currently authenticated user
apiRouter.get('/user/me', async (req, res) => {
  authToken = req.cookies['token'];
  const user = await collection.findOne({ token: authToken });
  if (user) {
    res.send({ username: user.username });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});


function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});