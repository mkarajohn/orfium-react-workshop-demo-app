const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const serverPort = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/blogposts', (req, res) => {
  const db = require('./db.json');

  res.json(db.blogposts);
});

app.get('/api/blogposts/:id', (req, res) => {
  const db = require('./db.json');
  const blogposts = db.blogposts;
  const entry = blogposts[req.params.id];

  if (entry) {
    res.json(blogposts[req.params.id] || {});
  }

  res.sendStatus(404);
});

app.post('/api/blogposts', (req, res) => {
  const db = require('./db.json');
  const newEntry = {
    title: req.body.title,
    description: req.body.description || '',
    content: req.body.content,
  };
  const blogpostIDs = Object.keys(db.blogposts);
  const newEntryID = blogpostIDs.length + 1;

  db.blogposts[newEntryID] = newEntry;
  
  fs.writeFile(
    path.join(path.resolve(), 'src/backend/db.json'),
    JSON.stringify(db, undefined, '  '),
    (err) => {
      if (err) {
        res.send({ message: 'post failed' });
      }

      res.json({ id: newEntryID, ...newEntry });
    }
  );
});

app.listen(serverPort, () => {
  console.log(`API server running on port ${serverPort}`);
});
