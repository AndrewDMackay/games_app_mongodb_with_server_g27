
const express = require('express');
const ObjectID = require('mongodb').ObjectID

const createRouter = function (collection) {

  const router = express.Router();


  // INDEX, get all games from MongoDB, and serve as JSON..

  router.get('/', (req, res) => {
    collection.find().toArray()
    .then((docs) => {res.json(docs)
    })
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
    .then((doc) => {res.json(doc)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({status: 500, error: err})
    })  
  })


// CREATE, Post new game, and persist to the database..

// Note.. To parse the req.'body' requires, 'app.use(express.json());' in the head of your server..


  router.post('/', (req, res) => {
    const newData = req.body
    collection.insertOne(newData)
    .then((result) => {
      console.log(result)
      res.json(result.ops[0])
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({status: 500, error: err})
    })  
  })


// DESTROY, delete a game via its ID..

  router.delete('/:id', (req, res) => {
    const id = req.params.id
    collection.deleteOne({_id: ObjectID(id)})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({status: 500, error: err})
    }) 
  })


  // UPDATE, update a game that already exists via its ID..

  router.put('/:id', (req, res) => {
    const id = req.params.id
    const updatedData = req.body
    collection.updateOne(
      {_id: ObjectID(id)},
      {$set: updatedData}
    )
  })


  return router;

};

module.exports = createRouter;

