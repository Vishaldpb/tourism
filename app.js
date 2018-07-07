var express = require("express");
var bodyParser = require("body-parser");
var mongoose    = require("mongoose");
var Country  = require("./Models/countries.js");
var Group   = require("./Models/groups.js")
var MemberRegRecords = require("./Models/MemberRegRecords.js");

var app = express();

// app.listen(3000, function(){
//     console.log("Server is started successfully");
// });
//mongoose.connect("mongodb://localhost/yelp_camp_v3");
//mongoose.connect("mongodb://localhost:27017/hacka", { useNewUrlParser: true })
  
  
mongoose.connect("mongodb://sunny:hack1998@ds129321.mlab.com:29321/hackathon", { useNewUrlParser: true });  
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("client"));
app.set("view engine", "ejs");


app.get("/",function(req, res) {
     res.sendFile(__dirname,'/index.html');
})



app.get('/submit-data/newdata', function(req, res) {
    res.send('Register'); 
})

app.post('/submit-data', function(req, res) {
    
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var Passport = req.body.passPort;
    var mobile = req.body.mobile;
    var country = req.body.country;
    
    var newMember = {
        firstName :firstName,
        lastName: lastName,
        Passport  : Passport,
        mobile : mobile,
        country : country
    };
    
    MemberRegRecords.create(newMember, function(err, data){
        if(err){
            console.log(err) ;
        }else{
            res.redirect("/allCountries");
        }
    })
    
} );




app.get('/allCountries',function(req,res){
   
    Country.find({}, function(err, allCountries){
       if(err){
           console.log(err);
       } else {
          res.render("countindex",{country:allCountries});
       }
    }); 
    
});



app.post('/allCountries',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.quoute;
    var newCountry = {name: name, image: image, quoute: desc}
    Country.create(newCountry, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to countries page
            res.redirect("/allCountries");
        }
    });
    
});
app.get('/allCountries/new',function(req,res){
   res.render('new') 
});

app.get('/allCountries/:id',function(req, res) {
   Country.findById(req.params.id).populate("groups").exec(function(err, foundCountry){
        if(err){
            console.log(err);
        } else {
            
            //render show template with that campground
            res.render("show", {country:foundCountry});
        }
    });
   
});
 
app.get('/allCountries/:id/new2',function(req, res) {
       Country.findById(req.params.id,function(err, foundCountry){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
        
            res.render("new2", {country:foundCountry});
        }
    });
   
});

app.post('/allCountries/:id',function(req, res) {
    
     Country.findById(req.params.id, function(err, country){
       if(err){
           console.log(err);
           
       } else {
        var name = req.body.name;
    var image = req.body.image;
    var places = req.body.places;
    var contact = req.body.contact;
    var leader = req.body.leader;
    var members = req.body.members;
    var gre = {name: name,image: image,places: places,contact: contact,leader:leader,members:members}   
        Group.create(gre, function(err, group){
           if(err){
               console.log(err);
           } else {
              
              
               console.log(group)
               country.groups.push(group);
               country.save();
              
               res.redirect('/campgrounds/' + country._id);
           }
        });
       }
   });
    
})

app.get("*",function(req, res) {
    res.send("Welcome");
})
//MongoClient.connect(
   // 'mongodb://username:password@ds033170.mongolab.com:33170/myDatabaseName',
    //function(err, db) {  });

app.listen(process.env.PORT , process.env.IP , function(){
 
  console.log("app has started");
});