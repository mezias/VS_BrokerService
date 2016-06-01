/**
 * Created by minhnguy on 26.04.2016.
 */
require('dotenv').load();
var express = require('express');
var router = express.Router();

var username = process.env.cloudant_username;
var password = process.env.cloudant_password;
var Cloudant = require("cloudant");
var db = Cloudant({account:username, password:password}).use('todos');

router.get('/todos', function (req, res, next) {
    db.find({selector:{_id:{$gt:0}},sort:[{_id:"asc"}]}, function (err, result) {
        if (err){
            res.send(err)
        } else {
            res.json(result.docs)
        }
    })
});

router.post('/todo', function (req, res, next) {
    var todo = req.body;
    if(!todo.text || !(todo.isComplete + '')){
        res.status(400);
        res.json({
            "error":"Invalid data"
        });
    }else{
        db.insert(todo, function (err, result) {
            if(err){
                res.send(err);
            }else{
                res.json(result);
            }
        })
    }
})

module.exports = router