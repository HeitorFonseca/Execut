const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// employee Model Definition
const employeeSchema = new Schema({ 
    name: { type: String, required: true,},    
    roles: { type: [String], required: true},
    projectId: {type : Number, required: true}
});

employeeSchema.plugin(AutoIncrement, {inc_field: 'employeeId'});

module.exports = mongoose.model('Employee', employeeSchema);

