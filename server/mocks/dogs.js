module.exports = function(app) {
  var express = require('express');
  var dogsRouter = express.Router();
  var dogs = [
    {id: 1, name: 'Boomer', owner: 1},
    {id: 2, name: 'Wiley', owner: 1},
    {id: 3, name: 'Bosco', owner: 1},
    {id: 4, name: 'Rippy Tippy', owner: 1}
  ];
  var insertIndex = dogs.length + 1;
  dogsRouter.get('/', function(req, res) {
    res.send({dogs:dogs});
  });
  dogsRouter.get('/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    res.send({dogs:[dogs[id - 1]]});
  });
  dogsRouter.delete('/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    dogs.splice(id - 1, 1);
    res.send({});
  });
  dogsRouter.post('/', function(req, res) {
    var newdog = req.body.dog;
    newdog.id = insertIndex++;
    dogs.push(newdog);
    res.send({dogs:[newdog]});
  });
  dogsRouter.put('/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    var dogIndex;
    var updateddog = req.body.dog;
    updateddog.id = id;

    for (var i = 0; i < dogs.length; i++) {
      if (dogs[i].id === id) {
        dogIndex = i;
        break;
      }
    }

    dogs.splice(dogIndex, 0, updateddog);
    res.send({dogs:[updateddog]});
  });

  app.use('/admin/dogs', dogsRouter);
};
