const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Project Model Definition
const projectSchema = new Schema({ 
    name: { type: String, required: true,  unique: true},
    address: { type: String, required: true},
    bimmodel: { type: String, required: true},
    users: [ {type : Number, ref : 'user'} ]
});

projectSchema.plugin(AutoIncrement, {inc_field: 'projectId'});


module.exports = mongoose.model('Project', projectSchema);