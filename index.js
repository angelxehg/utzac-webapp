'use strict';
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/proyecto';

var app = require('./app');
var port = process.env.PORT || 8000;

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, obj) {
  if (err) {
    console.error(err);
  } else {
    console.log("Conexión exitosa");
    app.listen(port, function () {
      console.log("Servidor iniciado en el puerto " + port);
    })
  }
});
