const express = require('express');
const cors = require('cors');
const { queryBooks } = require('./search.js');
const { response } = require('express');

const app = express();
app.use(cors());

app.get('/search', async (req, res) => {
  const keywords = req.query.keywords;
  const category = req.query.category;

  const results = await queryBooks(keywords, category);

  const response = [];
  // const count = results[0];
  for (i = 1; i < results.length; i += 2) {
    response.push({ key: results[i], title: results[i + 1][1] });
  }
  res.json(response);
});

const port = 9090;
app.listen(port, () => {
  console.log(`Search API app listening at http://localhost:${port}`);
});
