const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise; // Configure Mongoose Promises


// User Model Definition
const userSchema = new Schema({
 
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true},
  name: { type: String, required: true},
  roles: { type: [String], required: true},
  projects: [ {type : String, ref : 'project'} ]

});

// Schema Middleware to Encrypt Password
userSchema.pre('save', function(next) {
  console.log("apply encryption1");

  // Ensure password is new or modified before applying encryption
  if (!this.isModified('password'))
    return next();
  // Apply encryption
  console.log("apply encryption");
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err); // Ensure no errors

    this.password = hash; // Apply encryption to password
    next(); // Exit middleware
  });
});

// taskSchema.set('toJSON', {
//   transform: function(doc, ret, options) {
//       var retJson = {
//           id: ret._id,
//           username: ret.username,
//           name: ret.name,
//           roles: ret.roles,
//           projects: ret.projects,
//       };
//       return retJson;
//   }
// });

// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};


//userSchema.plugin(AutoIncrement, {inc_field: 'userId'});

// Export Module/Schema
module.exports = mongoose.model('User', userSchema);