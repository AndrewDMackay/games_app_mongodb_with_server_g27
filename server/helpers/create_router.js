
const express = require('express');
const ObjectID = require('mongodb').ObjectID

const createRouter = function (collection) {

  const router = express.Router();


  // INDEX, get all games from MongoDB, and serve as JSON..

  router.get('/', (req, res) => {
    collection.find().toArray()
    .then((docs) => {res.json(docs)})
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({status: 500, error: err})
    })
  })

  // SHOW, get one game back via its ID, and serve as JSON..

  router.get('/:id', (req, res) => {
    const id = req.params.id
    collection.findOne({_id: ObjectID(id)})
    .then(() => {res.json(doc)})
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({status: 500, error: err})
    })  
  })


  return router;

};

module.exports = createRouter;

