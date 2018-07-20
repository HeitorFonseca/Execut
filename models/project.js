const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Project Model Definition
const projectSchema = new Schema({ 
    Name: { type: String, required: true,  unique: true},
    Address: { type: String, required: true},
    Bimmodel: { type: String, required: true},
    ObjectKey: { type: String, required: true},
    BucketName: { type: String, required: true},
    Users: [ {type : Schema.Types.ObjectId, ref : 'user'} ]
});

module.exports = mongoose.model('Project', projectSchema);