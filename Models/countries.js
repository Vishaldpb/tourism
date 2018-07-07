var mongoose = require('mongoose');

var countrySchema = mongoose.Schema(
    {
   name: String,
   image: String,
   quoute: String,
   groups: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Group"
    }
     ]        
    }
    
    );

var Country = mongoose.model("Country", countrySchema);

module.exports = Country;
    