const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Service Model Definition
const serviceSchema = new Schema({ 
    name: { type: String, required: true,},    
    description: { type: String, required: true},
    projectId: {type : Schema.Types.ObjectId, ref : 'Project'}
});

serviceSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        var retJson = {
            id: ret._id,
            name: ret.name,
            description: ret.description            
        };
        return retJson;
    }
});

module.exports = mongoose.model('Service', serviceSchema);

