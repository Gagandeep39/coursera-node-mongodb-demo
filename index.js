/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-08 05:26:10
 * @modify date 2020-12-08 05:26:10
 * @desc [description]
 */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config();

// Update env to localhost  or rmove env file f running locally i.e outside devcontainer
const url = `mongodb://${process.env.HOST_NAME || 'localhost'}:27017/`;
const dbname = 'gagan';

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log('Connected correctly to server');

  const db = client.db(dbname);
  const collection = db.collection('dishes');
  collection.insertOne(
    { name: 'pasta', description: 'Cheese Pasta' },
    (err, result) => {
      assert.equal(err, null);

      console.log('After Insert:\n');
      console.log(result.ops);

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);

        console.log('Found:\n');
        console.log(docs);

        db.dropCollection('dishes', (err, result) => {
          assert.equal(err, null);

          client.close();
        });
      });
    }
  );
});
