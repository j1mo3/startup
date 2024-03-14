const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/missionary-connect-api`, apiRouter);

//get service country
apiRouter.get('/get-country', (_req, res) => {
  res.send(country)
});

apiRouter.get('get-area', (_req, res) => {
  res.send(missionArea)
});

//get current posts
apiRouter.get('/get-posts', (_req, res) => {
  res.send(posts)
});

//make post
apiRouter.post('/add-post', (req, res) => {
    scores = updatePosts(req.body, posts);
    res.send(posts);
  });


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// // updateScores considers a new score for inclusion in the high scores.
// // The high scores are saved in memory and disappear whenever the service is restarted.
let posts = [];
function updatePosts(newPost, posts) {
  posts.unshift(newPost);

  if (posts.length > 50) {
    posts.length = 50;
  }

  return posts;
}
