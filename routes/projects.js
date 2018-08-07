var express = require('express');
var router = express.Router();
const mongoose = require('mongoose'); // Node Tool for MongoDB

// handle file upload
var multer = require('multer')
var upload = multer({ dest: './tmp' })

var Project = require('../models/project');
var User = require('../models/user');
var Employee = require('../models/employee');
var Material = require('../models/material');
var Equipment = require('../models/equipment');
var Service = require('../models/service');
var Task = require('../models/task');

var Bucket = require('./forge/ossFunc');

/* Get all projects */
router.get('/', function (req, res, next) {
    console.log("get all projects here");
    Project.find({})
        .then(result => res.json(result))
        .catch(err => console.log(err))
});

/* Get all projects */
router.get('/:id', function (req, res, next) {
    console.log("get project by id");
    var query = { _id: req.params.id };
    console.log(query);
    Project.findById(req.params.id, function (err, project) {
        if (err) {
            res.json(err);
        }
        //console.log(project);
        res.json(project);
    });
});

/* Save Project */
router.post('/register', upload.single('fileToUpload'), async function (req, res, next) {
    console.log("register project:", req.body);

    var bucketKey = req.body.bucketKey;

    bucketStatus = await Bucket.PostBucket(bucketKey, "persistent");

    if (!bucketStatus.success) {
        res.json(bucketStatus);
    }
    else {

        fileStatus = await Bucket.PostFile(bucketKey, req.file);

        if (!fileStatus.success) {
            console.log("delete bucket");
            delBucketStatus = await Bucket.DeleteBucket(bucketKey);
            res.json(fileStatus);
        }
        else {

            project = {
                name: req.body.name,
                address: req.body.address,
                bimModel: fileStatus.object.body.objectKey,
                objectKey: fileStatus.object.body.objectId.toBase64(),
                bucketName: bucketKey,
                filePath: req.file.path,
                users: req.body.users,
            }

            Project.create(project, async function (err, project) {
                if (err) {

                    delFileStatus = await Bucket.DeleteFile(bucketKey, req.file);
                    delBucketStatus = await Bucket.DeleteBucket(bucketKey);

                    //console.log(err);
                    // Check if error is an error indicating duplicate account
                    if (err.code === 11000) {
                        res.json({ success: false, message: 'O nome do projeto já existe' }); // Return error
                    } else {
                        res.json({ success: false, message: 'Não foi possivel salvar o projeto. Erro: ', err }); // Return error if not related to validation
                    }

                } else {
                    var query = { _id: req.body.users };
                    //console.log("query:", query, "project:", project);
                    // n x n relationship -> update user with project id
                    User.findOneAndUpdate(query, { $push: { "projects": project._id } }, async function (err, user) {
                        if (err) {
                            //console.log(err);
                            delFileStatus = await Bucket.DeleteFile(bucketKey, req.file);
                            delBucketStatus = await Bucket.DeleteBucket(bucketKey);
                            res.json({ success: false, message: 'Não foi possivel atualizar o usuário. Error: ', err }); // Return error if not related to validation              
                        }
                        else {
                            res.json({ success: true, message: 'Projeto registrado!', project: project }); // Return success
                        }
                    });
                }
            });
        }
    }
});

/* Delete project */
router.delete('/:id', async function (req, res, next) {
    console.log("delete project by id:", req.params);

    var query = { _id: req.params.id };
    Project.findOneAndRemove(query, async function (err, project) {
        console.log("project", project);
        if (err) {
            res.json({ success: false, message: "Nâo foi possivel remover o projeto" });
        }
        else {

            // originalName = project.filePath.split("\\");
            // file = {
            //     // path: __dirname + "\\..\\" + project.filePath.toString(),
            //     path: project.filePath.toString(),
            //     originalname: originalName[originalName.length-1].toString()
            // }
            //delFileStatus = await Bucket.DeleteFile(project.bucketName, JSON.stringify(file));
            delBucketStatus = await Bucket.DeleteBucket(project.bucketName);

            res.json(project);
        }
    });
});

/* Register Employee */
router.post('/registerEmployee', function (req, res, next) {
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

/* Get Employee */
router.get('/:id/employeer', function (req, res, next) {
    //console.log("get all employeer here");  
    console.log("get employee: query", req.params);

    var query = { projectId: req.params.id };

    Employee.find(query, function (err, employees) {
        if (err) {
            res.json(err);
        }
        //console.log(employees);
        res.json(employees);
    });
});

/* Delete project */
router.delete('/employeer/:id', function (req, res, next) {

    var query = { _id: req.params.id };

    Task.find({ employeeId: req.params.id }, function (err, tasks) {

        if (err) {
            res.json({ success: false, message: "Não foi possivel remover o funcionário" });
        } else {
            if (!tasks.length) {
                Employee.findOneAndRemove(query, function (err, project) {
                    if (err) {
                        res.json({ success: false, message: "Não foi possivel remover o funcionário" });
                    }
                    res.json({ success: true, message: "Funcionário removido" });
                });
            } else {
                res.json({ success: false, message: "Este item não pode ser removido pois ele está associado a uma tarefa" });
            }
        }
    });
});

/* Register Material */
router.post('/registerMaterial', function (req, res, next) {
    console.log("Register material");
    console.log(req.body);

    Material.create(req.body, function (err, material) {
        if (err) {
            console.log(err);
            res.json({ success: false, message: 'Não foi possivel registrar o material. Erro: ', err }); // Return error if not related to validation

        } else {
            console.log("material registrado");
            res.json({ success: true, message: 'Material registrado!' }); // Return success
        }
    });
});

/* Get Materials */
router.get('/:id/materials', function (req, res, next) {

    var query = { projectId: req.params.id };
    Material.find(query, function (err, materials) {
        if (err) {
            res.json(err);
        }
        //console.log(materials);
        res.json(materials);
    });
});

/* Delete Material */
router.delete('/materials/:id', function (req, res, next) {
    console.log("delete material by id:", req.params);

    var query = { _id: req.params.id };

    Task.find({ materialId: { $in: req.params.id } }, function (err, tasks) {

        if (err) {
            res.json({ success: false, message: "Não foi possivel remover o Material" });
        } else {
            if (!tasks.length) {
                Material.findOneAndRemove(query, function (err, material) {
                    if (err) {
                        res.json({ success: false, message: "Não foi possivel remover o material" });
                    }

                    res.json({ success: true, message: "Material removido" });
                });
            } else {
                res.json({ success: false, message: "Este item não pode ser removido pois ele está associado a uma tarefa" });
            }
        }
    });
});


/* Register Service */
router.post('/registerService', function (req, res, next) {
    console.log("Register service");
    console.log(req.body);

    Service.create(req.body, function (err, project) {
        if (err) {
            console.log(err);
            res.json({ success: false, message: 'Não foi possivel registrar o serviço. Erro: ', err }); // Return error if not related to validation

        } else {
            console.log("service registrado");
            res.json({ success: true, message: 'Serviço registrado!' }); // Return success
        }
    });
});

/* Get Services */
router.get('/:id/services', function (req, res, next) {
    //console.log("get all services here");  
    //console.log("query", req.query );  

    var query = { projectId: req.params.id };

    Service.find(query, function (err, services) {
        if (err) {
            res.json(err);
        }
        //console.log(services);
        res.json(services);
    });
});

/* Delete Service */
router.delete('/services/:id', function (req, res, next) {
    console.log("delete Service by id:", req.params);

    var query = { _id: req.params.id };

    Task.find({ serviceId: req.params.id }, function (err, tasks) {
        if (err) {
            res.json({ success: false, message: "Não foi possivel remover o serviço" });
        } else {
            if (!tasks.length) {
                Service.findOneAndRemove(query, function (err, service) {
                    if (err) {
                        res.json({ success: false, message: "Não foi possivel remover o serviço" });
                    }
                    res.json({ success: true, message: "Serviço removido" });
                });
            } else {
                res.json({ success: false, message: "Este item não pode ser removido pois ele está associado a uma tarefa" });
            }
        }
    });
});

/* Equipment */
router.post('/registerEquipment', function (req, res, next) {
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

router.get('/:id/equipments', function (req, res, next) {
    //console.log("get all equipments here");  
    //console.log("query", req.query );  

    var query = { projectId: req.params.id };

    Equipment.find(query, function (err, equipments) {
        if (err) {
            res.json(err);
        }
        //console.log(equipments);
        res.json(equipments);
    });
});

/* Delete Equipment */
router.delete('/equipments/:id', function (req, res, next) {
    console.log("delete Equipment by id:", req.params);

    var query = { _id: req.params.id };

    Task.find({ equipmentId: { $in: req.params.id } }, function (err, tasks) {
        if (err) {
            res.json({ success: false, message: "Não foi possivel remover o equipamento" });
        } else {
            if (!tasks.length) {
                Equipment.findOneAndRemove(query, function (err, project) {
                    if (err) {
                        res.json({ success: false, message: "Não foi possivel remover o equipamento" });
                    }
                    res.json({ success: true, message: "Equipamento removido" });
                });
            } else {
                res.json({ success: false, message: "Este item não pode ser removido pois ele está associado a uma tarefa" });
            }
        }
    });
});


/* Task */

router.post('/registerTask', function (req, res, next) {
    console.log("Register tarefa");

    console.log(req.body);

    Task.create(req.body, function (err, project) {
        if (err) {
            console.log(err);
            res.json({ success: false, message: 'Não foi possivel registrar a tarefa. Erro: ', err }); // Return error if not related to validation

        } else {
            console.log("tarefa registrada");
            res.json({ success: true, message: 'Tarefa registrada!' }); // Return success
        }
    });
});

router.get('/:id/tasks', function (req, res, next) {
    //console.log("get all equipments here");  
    //console.log("query", req.query );  

    var query = { projectId: mongoose.Types.ObjectId(req.params.id) };
    var query2 = { projectId: req.params.id };
    console.log("get tasks:", query, query2);

    Task.aggregate([

        { $match: { projectId: mongoose.Types.ObjectId(req.params.id) } },
        {
            $lookup: {
                localField: "employeeId",
                from: "employees",
                foreignField: "_id",
                as: "employee"
            }
        },
        { $unwind: "$employee" },
        //service
        {
            $lookup: {
                localField: "serviceId",
                from: "services",
                foreignField: "_id",
                as: "service"
            }
        },
        { $unwind: "$service" },
        //material
        {
            $lookup: {
                localField: "materialId",
                from: "materials",
                foreignField: "_id",
                as: "materials"
            }
        },
        // equipment
        {
            $lookup: {
                localField: "equipmentId",
                from: "equipment",
                foreignField: "_id",
                as: "equipments"
            }
        },
        { $addFields: { id: "$_id" } },
        {
            $project: { _id: 0, employeeId: 0, materialId: 0, equipmentId: 0, serviceId: 0 }
        }

    ], function (err, tasks) {
        if (err) {
            console.log("error", err);
            res.json({ success: false, message: 'Não foi possivel retornar a tarefa. Erro: ', err });
        }
        else {
            console.log("tarefa:", tasks);
            res.json(tasks);
        }

    });
});

router.delete('/task/:taskId', function (req, res, next) {
    //console.log("get all equipments here");  
    //console.log("query", req.query );  

    var query = { _id: req.params.taskId };
    console.log("delete tasks:", query);

    Task.findOneAndRemove(query, function (err, tasks) {
        if (err) {
            res.json({ success: false, message: 'Não foi possivel remover a tarefa!' });
        }
        else {
            //console.log(tasks);
            res.json({ success: true, message: 'Tarefa removida!' });
        }
    });
});

String.prototype.toBase64 = function () {
    return new Buffer(this).toString('base64');
};

module.exports = router;