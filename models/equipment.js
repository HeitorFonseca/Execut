const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Equipment Model Definition
const equipmentSchema = new Schema({ 
    name: { type: String, required: true,},    
    description: { type: [String], required: true},
    projectId: {type : Number, required: true}
});

equipmentSchema.plugin(AutoIncrement, {inc_field: 'equipmentId'});

module.exports = mongoose.model('Equipment', equipmentSchema);

