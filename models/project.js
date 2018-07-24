const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Project Model Definition
const projectSchema = new Schema({ 
    name: { type: String, required: true,  unique: true},
    address: { type: String, required: true},
    bimModel: { type: String, required: true},
    objectKey: { type: String, required: true},
    bucketName: { type: String, required: true},
    users: [ {type : Schema.Types.ObjectId, ref : 'user'} ]
});

projectSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var retJson = {
            id: ret._id,
            name: ret.name,
            address: ret.address,
            bimModel: ret.bimModel,
            objectKey: ret.objectKey,
            bucketName: ret.bucketName
        };
        return retJson;
    }
  });

module.exports = mongoose.model('Project', projectSchema);