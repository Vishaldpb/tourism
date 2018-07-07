var mongoose = require('mongoose');

var groupSchema = mongoose.Schema(
    {
   name: String,
   image: String,
   places: String,
   contact: String,
   leader: String,
   members: String,
   created:  {type: Date, default: Date.now}
        
    }
    
    );

var Group = mongoose.model("Group", groupSchema);

module.exports = Group;