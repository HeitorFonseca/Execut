const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises


// User Model Definition
const userSchema = new Schema({
 
  Email: { type: String, required: true, unique: true, lowercase: true },
  Username: { type: String, required: true, unique: true, lowercase: true },
  Password: { type: String, required: true},
  Name: { type: String, required: true},
  Roles: { type: [String], required: true},
  Projects: [ {type : Number, ref : 'project'} ]

});

// Schema Middleware to Encrypt Password
userSchema.pre('save', function(next) {
  // Ensure password is new or modified before applying encryption
  if (!this.isModified('Password'))
    return next();
  // Apply encryption
  bcrypt.hash(this.Password, null, null, (err, hash) => {
    if (err) return next(err); // Ensure no errors

    this.Password = hash; // Apply encryption to password
    next(); // Exit middleware
  });
});

// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.Password); // Return comparison of login password to password in database (true or false)
};


//userSchema.plugin(AutoIncrement, {inc_field: 'userId'});

// Export Module/Schema
module.exports = mongoose.model('User', userSchema);