const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Task Model Definition
const taskSchema = new Schema({ 
    Description: { type: [String], required: true},
    InitialDate: { type: String, required: true},
    FinalDate: { type: String, required: true},
    Status: { type: String, required: true},
    ProjectId: {type : Schema.Types.ObjectId, ref : 'Project'},
    EmployeeId: {type : Number, required: true},
    ServiceId: {type : Number, required: true},
    MaterialId: [{type : Number }],
    EquipmentId: [{type : [Number]}],
    ForgeObjs: [{
        DbId: String,
        ExternalId: String,
        Name: String
      }]   
});

module.exports = mongoose.model('Task', taskSchema);

