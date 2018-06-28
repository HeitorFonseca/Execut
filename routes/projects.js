var express = require('express');
var router = express.Router();

var Project = require('../models/project');
var User = require('../models/user');


/* Get all projects */
router.get('/', function(req, res, next) {
    console.log("get all projects here");  
    Project.find({})
      .then(result => res.json(result))
      .catch(err => console.log(err))
});

/* Get all projects */
router.get('/id', function(req, res, next) {
    console.log("get property by id");
    var query = { projectId: req.query.projectId };
    console.log(query);
    Project.findOne(query, function(err, project) {
        if (err) {
            res.json(err);
        }
        console.log(project);
        res.json(project);
    });
});

/* Save Project */
router.post('/register', function(req, res, next) {
    console.log("register project:", req.body);
    Project.create(req.body, function (err, project) {          
        if (err) {
            console.log(err);
            // Check if error is an error indicating duplicate account
            if (err.code === 11000) {
                res.json({ success: false, message: 'O nome do projeto já existe' }); // Return error
            } else {
                res.json({ success: false, message: 'Não foi possivel salvar o projeto. Erro: ', err }); // Return error if not related to validation
            }      
        } else {
            var query = { userId: req.body.users[0] };
            console.log("query:", query, "project:", project);
            User.findOneAndUpdate(query, {$push:{"projects":project.projectId}} , function(err, user){
                if (err) {        
                    console.log(err) ;
                    res.json({ success: false, message: 'Não foi possivel atualizar o usuário. Error: ', err }); // Return error if not related to validation              
                }   
                else {
                    res.json({ success: true, message: 'Projeto registrado!' }); // Return success
                }
            });
        }    
      
    });
});

  module.exports = router;