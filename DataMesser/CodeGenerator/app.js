var express = require('express'),
    app = express(),//Try Again
    engines = require('consolidate'),//why
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');//Error Handle

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/Talend', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res){

        db.collection('MISMO_Path').find({}).toArray(function(err, docs) {
            res.render('CodeGen', { 'MISMO_Path': docs } );
        });

    });

    app.use(function(req, res){
        res.sendStatus(404);
    });

    var server = app.listen(3002, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});
