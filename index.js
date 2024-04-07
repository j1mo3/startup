const express = require('express');
const app = express();
const DB = require('./database.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
// const { peerProxy } = require('./peerProxy.js');
//const { peerProxy } = require('./peerProxy.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());
// Serve up the front-end static content hosting
app.use(express.static('public'));
app.use(cookieParser());
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
    setAuthCookie(res, body["username"]);

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

  try {
    const user = await DB.getLogin(body['username']);
    if (user) {
      const passwordMatch = await bcrypt.compare(body['password'], user['password']);
      if (passwordMatch) {
        //res.status(200).send({ id: user._id });
        console.log(body['username']);
        setAuthCookie(res, body['username']);
        res.status(200).send({ username: body['username'] });
        return;
      }
    }
    console.log('Invalid username or password');
    res.status(401).send({ msg: 'Unauthorized' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ msg: 'Internal Server Error' });
  };
});

// getMe for the currently authenticated user
// apiRouter.get('/user/me', async (req, res) => {
//   //try {
//     authToken = req.cookies['username'];
//     console.log(authToken);
//     const user = await collection.findOne({ username: authToken });
//     if (user) {
//       //setAuthCookie(res, authToken);
//       res.send({ username: user.username });
//       return;
//     }
//     res.status(401).send({ msg: 'Unauthorized' });
//   // } catch {
//   //   console.log('Something went wrong')
//   // };
// });

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

// peerProxy(httpService);