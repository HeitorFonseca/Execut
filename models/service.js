const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Service Model Definition
const serviceSchema = new Schema({ 
    name: { type: String, required: true,},    
    description: { type: [String], required: true},
    projectId: {type : Number, required: true}
});

serviceSchema.plugin(AutoIncrement, {inc_field: 'serviceId'});

module.exports = mongoose.model('Service', serviceSchema);

