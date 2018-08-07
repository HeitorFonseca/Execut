const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose

const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises

// Status Model Definition
const statusSchema = new Schema({ 
    name: { type: String, required: true},    
}, { collection: 'stati' });

statusSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        var retJson = {
            id: ret._id,
            name: ret.name,
        };
        return retJson;
    }
});



module.exports = mongoose.model('Stati', statusSchema);

