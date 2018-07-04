var express = require('express');
var router = express.Router();

var Status = require('../models/status');


/* Get all status */

router.get('/', function(req, res, next) {
    //console.log("get ALLLLLLLLLLLLLLLL status");  
    //console.log("query", req.query );  

    Status.find({}, function(err, stati) {
        if (err) {
            res.json(err);
        }
        //console.log(stati);
        res.json(stati);
    });
});


module.exports = router;