const express = require('express');
const app = express();
const DB = require('./database.js');

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
// app.post('/auth/create', async (req, res) => {
//   if (await getUser(req.body.email)) {
//     res.status(409).send({ msg: 'Existing user' });
//   } else {
//     const user = await createUser(req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.mission, req.body.startDate, req.body.endDate, req.body.phoneNumber, req.body.prefix);
//     setAuthCookie(res, user.token);
//     res.send({
//       id: user._id,
//     });
//   }
// });

// // loginAuthorization from the given credentials
// app.post('/auth/login', async (req, res) => {
//   const user = await getUser(req.body.username);
//   if (user) {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       setAuthCookie(res, user.token);
//       res.send({ id: user._id });
//       return;
//     }
//   }
//   res.status(401).send({ msg: 'Unauthorized' });
// });

// // getMe for the currently authenticated user
// app.get('/user/me', async (req, res) => {
//   authToken = req.cookies['token'];
//   const user = await collection.findOne({ token: authToken });
//   if (user) {
//     res.send({ username: user.username });
//     return;
//   }
//   res.status(401).send({ msg: 'Unauthorized' });
// });

// function getUser(username) {
//   return collection.findOne({ username: username });
// }

// async function createUser(username, password, firstName, lastName, missionArea, startDate, endDate, phoneNumber, prefix) {
//   const passwordHash = await bcrypt.hash(password, 10);
//   const user = {
//     username: username,
//     password: passwordHash,
//     firstName: firstName,
//     lastName: lastName,
//     missionArea: missionArea, 
//     startDate: startDate,
//     endDate: endDate,
//     phoneNumber: phoneNumber,
//     prefix: prefix,
//     token: uuid.v4()
//   };
//   await collection.insertOne(user);

//   return user;
// }

// function setAuthCookie(res, authToken) {
//   res.cookie('token', authToken, {
//     secure: true,
//     httpOnly: true,
//     sameSite: 'strict',
//   });
// }


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});