/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-08 05:26:10
 * @modify date 2020-12-08 05:26:10
 * @desc [description]
 */
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
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
        });
      });
    }
  );

  // Running operations of other file
  dboper.insertDocument(
    db,
    { name: 'Pizza', description: 'Test' },
    'dishes',
    (result) => {
      console.log('Insert Document:\n', result.ops);

      dboper.findDocuments(db, 'dishes', (docs) => {
        console.log('Found Documents:\n', docs);

        dboper.updateDocument(
          db,
          { name: 'Pizza' },
          { description: 'Updated Test' },
          'dishes',
          (result) => {
            console.log('Updated Document:\n', result.result);

            dboper.findDocuments(db, 'dishes', (docs) => {
              console.log('Found Updated Documents:\n', docs);

              db.dropCollection('dishes', (result) => {
                console.log('Dropped Collection: ', result);

                client.close();
              });
            });
          }
        );
      });
    }
  );
});
