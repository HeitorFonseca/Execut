var express = require('express');
var router = express.Router();

var Project = require('../models/project');
var User = require('../models/user');
var Employee = require('../models/employee');
var Material = require('../models/material');
var Equipment = require('../models/equipment');

/* Get all projects */
router.get('/', function(req, res, next) {
    console.log("get all projects here");  
    Project.find({})
      .then(result => res.json(result))
      .catch(err => console.log(err))
});

/* Get all projects */
router.get('/:id', function(req, res, next) {
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
            // n x n relationship -> update user with project id
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

/* Employee */
router.post('/registerEmployee', function(req, res, next) {
    console.log("Register employee");

    console.log(req.body);

    Employee.create(req.body, function (err, project) {          
        if (err) {
            console.log(err);           
            res.json({ success: false, message: 'Não foi possivel registrar o funcionário. Erro: ', err }); // Return error if not related to validation
                 
        } else {
            console.log("funcionario registrado");           
            res.json({ success: true, message: 'Funcionário registrado!' }); // Return success
        }          
    });
});

/* Material */
router.post('/registerMaterial', function(req, res, next) {
    console.log("Register material");

    console.log(req.body);

    Material.create(req.body, function (err, project) {          
        if (err) {
            console.log(err);           
            res.json({ success: false, message: 'Não foi possivel registrar o material. Erro: ', err }); // Return error if not related to validation
                 
        } else {
            console.log("material registrado");           
            res.json({ success: true, message: 'Material registrado!' }); // Return success
        }          
    });
});

/* Service */
router.post('/registerService', function(req, res, next) {
    console.log("Register service");

    console.log(req.body);

    Material.create(req.body, function (err, project) {          
        if (err) {
            console.log(err);           
            res.json({ success: false, message: 'Não foi possivel registrar o serviço. Erro: ', err }); // Return error if not related to validation
                 
        } else {
            console.log("service registrado");           
            res.json({ success: true, message: 'Serviço registrado!' }); // Return success
        }          
    });
});

/* Equipment */
router.post('/registerEquipment', function(req, res, next) {
    console.log("Register equipment");

    console.log(req.body);

    Equipment.create(req.body, function (err, project) {          
        if (err) {
            console.log(err);           
            res.json({ success: false, message: 'Não foi possivel registrar o equipamento. Erro: ', err }); // Return error if not related to validation
                 
        } else {
            console.log("equipment registrado");           
            res.json({ success: true, message: 'Equipamento registrado!' }); // Return success
        }          
    });
});


module.exports = router;