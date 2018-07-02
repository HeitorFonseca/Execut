const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Material Model Definition
const materialSchema = new Schema({ 
    name: { type: String, required: true,},    
    description: { type: [String], required: true},
    projectId: {type : Number, required: true}
});

materialSchema.plugin(AutoIncrement, {inc_field: 'materialId'});

module.exports = mongoose.model('Material', materialSchema);

