const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// employee Model Definition
const employeeSchema = new Schema({
    name: { type: String, required: true, },
    roles: { type: [String], required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
});

employeeSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        var retJson = {
            id: ret._id,
            name: ret.name            
        };
        return retJson;
    }
});

module.exports = mongoose.model('Employee', employeeSchema);

