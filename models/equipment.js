const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Equipment Model Definition
const equipmentSchema = new Schema({ 
    Name: { type: String, required: true,},    
    Description: { type: [String], required: true},
    ProjectId: {type : Schema.Types.ObjectId, ref : 'Project'}
});

module.exports = mongoose.model('Equipment', equipmentSchema);

