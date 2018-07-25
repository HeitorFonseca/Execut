const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

var Employee = require('./employee');
var Material = require('./material');
var Equipment = require('./equipment');
var Service = require('./service');

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Task Model Definition
const taskSchema = new Schema({
    description: { type: String, required: true },
    initialDate: { type: String, required: true },
    finalDate: { type: String, required: true },
    status: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    materialId: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
    equipmentId: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
    forgeObjs: [{
        dbId: String,
        externalId: String,
        name: String
    }]
});

// taskSchema.set('toJSON', {
//     transform: function (doc, ret, options) {

//         const employee = await getEmployeer(ret.employeeId);
//         const material = await getMaterial(ret.materialId);
//         const equipment = await getEquipment(ret.equipmentId);
//         const service = await getService(ret.serviceId);

//         var retJson = {
//             id: ret._id,
//             description: ret.description,
//             initialDate: ret.initialDate,
//             finalDate: ret.finalDate,
//             status: ret.status,
//             employee: employee,
//             material: material,
//             equipment: equipment,
//             service: service,
//             forgeObjs: ret.forgeObjs
//         };
//         return retJson;
//     }
// });


// taskSchema.set('toJSON', {
//     transform: function (doc, ret, options) {

//         var retJson;
//         Employee.findById(ret.employeeId, function (err, employee) {
//             if (err) res.json("");
            
//             Service.findById(ret.serviceId, function(err, service) {
//                 if (err) res.json("");
    
//                 Material.find({'_id':{$in:ret.materialId}}, function(err, materials) {
//                     if (err) res.json("");
    
//                     Equipment.find({'_id':{$in:ret.equipmentId}}, function(err, equipments) {
//                         if (err) res.json("");
    
//                         // console.log("employee:", employee);
//                         // console.log("service:", service);
//                         // console.log("materials:", materials);
//                         // console.log("equipments:", equipments);

//                         retJson = {
//                             id: ret._id,
//                             description: ret.description,
//                             initialDate: ret.initialDate,
//                             finalDate: ret.finalDate,
//                             status: ret.status,
//                             employee: employee.name,
//                             material: "materials.name",
//                             equipment: "equipments.name",
//                             service: service.name,
//                             forgeObjs: ret.forgeObjs
//                         };

//                         console.log("retJson:", retJson);
//                         return retJson;
//                     });
//                 });
//             });            
//         });  

//         return retJson;
//     }
// });



function getEmployeer(employeeId) {
    Employee.findById(employeeId, function (err, employee) {
        if (err) res.json("");
        
        Service.findById(serviceId, function(err, service) {
            if (err) res.json("");

            Material.find({'_id':{$in:materials}}, function(err, materials) {
                if (err) res.json("");

                Equipment.find({'_id':{$in:equipments}}, function(err, equipments) {
                    if (err) res.json("");

                    var retJson = {
                        id: ret._id,
                        description: ret.description,
                        initialDate: ret.initialDate,
                        finalDate: ret.finalDate,
                        status: ret.status,
                        employee: employee,
                        material: materials,
                        equipment: equipments,
                        service: service,
                        forgeObjs: ret.forgeObjs
                    };
                    return retJson;
                });
            });
        });
        
    });  
}

function getService(serviceId) {
    console.log("2");    
    return Service.findById(serviceId).exec();    
}

function getMaterial(materials) {
    console.log("3");    
    return Material.find({'_id':{$in:materials}}).exec(); 
}

function getEquipment(equipments) {
    console.log("4");    
    return Equipment.find({'_id':{$in:equipments}}).exec();    
}


module.exports = mongoose.model('Task', taskSchema);

