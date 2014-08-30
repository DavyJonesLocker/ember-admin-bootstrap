module.exports = function(app) {
  var express = require('express');
  var ownersRouter = express.Router();
  var owners = [
    {id: 1, name: 'Brian', dogs: [1,2,3,4]}
  ];
  var insertIndex = owners.length + 1;
  ownersRouter.get('/', function(req, res) {
    res.send({owners:owners});
  });
  ownersRouter.get('/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    res.send({owners:[owners[id - 1]]});
  });
  ownersRouter.delete('/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    owners.splice(id - 1, 1);
    res.send({});
  });
  ownersRouter.post('/', function(req, res) {
    var newOwner = req.body.owner;
    newOwner.id = insertIndex++;
    owners.push(newOwner);
    res.send({owners:[newOwner]});
  });
  ownersRouter.put('/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    var ownerIndex;
    var updatedOwner = req.body.owner;
    updatedOwner.id = id;

    for (var i = 0; i < owners.length; i++) {
      if (owners[i].id === id) {
        ownerIndex = i;
        break;
      }
    }

    owners.splice(ownerIndex, 0, updatedOwner);
    res.send({owners:[updatedOwner]});
  });

  app.use('/admin/owners', ownersRouter);
};
