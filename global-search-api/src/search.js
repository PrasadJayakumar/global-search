const Redisearch = require('redis-modules-sdk').Redisearch;

const client = new Redisearch({
  host: 'localhost',
  port: 6379
});

async function queryBooks(keywords, category) {
  // Connect to the Redis database
  await client.connect();

  const ftCategory = category ? `@categories:{${category}}` : '';

  // FT.SEARCH
  const results = await client.search(
    'books-idx',
    `${keywords} ${ftCategory}`,
    {
      return: { num: 1, fields: ['title'] },
      sortBy: { field: 'average_rating', sort: 'DESC' },
      limit: { first: 1, num: 5 }
    }
  );

  // Disconnect from the Redis database
  await client.disconnect();

  // return results
  return results;
}

exports.queryBooks = queryBooks;

// queryBooks('dogs|cats', 'Juvenile Fiction').then((resp) => {
//   console.log(resp);
// });
