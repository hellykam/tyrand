var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  mongoClient.connect("mongodb://localhost:27017", function (
        err,
        client) {
        if (err) throw err;

        var db = client.db("tyrand-db");

        db.collection("quotes")
            .find()
            .toArray(function (err, result) {
                var quoteIndex = Math.floor(Math.random() * result.length);
            console.log(quoteIndex);
                res.render('quote-page', {
                    title: 'Quote',
                    quote: result[quoteIndex].text
                });
            });
    });
});

module.exports = router;
