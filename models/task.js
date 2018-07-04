const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Task Model Definition
const taskSchema = new Schema({ 
    description: { type: [String], required: true},
    initialDate: { type: String, required: true},
    finalDate: { type: String, required: true},
    status: { type: String, required: true},
    projectId: {type : Number, required: true},
    employeeId: {type : Number, required: true},
    serviceId: {type : Number, required: true},
    materialId: [{type : Number }],
    equipmentId: [{type : [Number]}]
});

taskSchema.plugin(AutoIncrement, {inc_field: 'taskId'});

module.exports = mongoose.model('Task', taskSchema);

