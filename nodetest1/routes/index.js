var express = require('express');
var router = express.Router();
var fs = require('fs');
var dialog = require('dialog');
var alert = require('alert-node');

//GET THE LOGIN PAGE, home page
router.get('/', function(req, res, next) {
    
    console.log("Welcome");
    
  res.render('login.html', { title: 'Login page' });
    
});


//PROFILE PAGE post login
router.post('/Profile', function(req, res)
{   
    var db = req.db;
    var collection = db.get('usercollection');
    //console.log(collection.find().pretty());
    console.log("Loggingin myself: " + req.body.username);
    
   
  UserName = req.body.username;
  Pwd = req.body.password;

 collection.find({username:UserName, password: Pwd}, function(e,docs){
      if(e){
          console.log("err")
      }
      else{  
          console.log("docs");
          console.log(docs);
          if(docs.length!= 0)
              {
                  console.log("user already registered");
                  //user details
                  req.session.user = docs[0];
                  console.log("docs session");
                  console.log(req.session.user);
                  
                  //username
                  console.log("docs session user");
                  console.log(req.session.user.username);
                  res.render("Profile.html", {docs: docs});
              }
          else{
              console.log("please register in the signup page/incorrect username or password");
              dialog.info('please register in the signup page/incorrect username or password');
      
              res.redirect('/');
          }
      }
  });
 
 });

        

//SIGN UP AND INSERT IN THE DATABASE           
router.post('/register', function(req,res){
    
    var db = req.db;
    var collection = db.get('usercollection');
    var userName = req.body.usernamesignup;
    var password = req.body.passwordsignup;
    var email = req.body.emailsignup;
    var Dob = req.body.dob;
    var Fitnesslevel = req.body.amount;
    var image = req.body.confirm;
   
    
    newUser = [{ "username": userName,
                 "password" : password,
                 "email": email,
                 "dob": Dob,
                 "fitnesslevel": Fitnesslevel,
                 "imageurl":image
                      }];
    
    collection.insert(newUser , function(err, doc){
            if(err) {
                res.send("insert failed");
            }
        else {
            
            console.log("user already registered, please login");
            res.redirect("/");
        }
    });
    
    
});


router.get('/Profile.html', function(req, res)
{   
    console.log("hi");
    //res.render('Profile.html', { title: 'profile page' });
    var db = req.db;
    var collection = db.get('usercollection');
     Usernm = req.session.user.username;
     collection.find({username:Usernm}, function(e,docs){
      if(e){
          console.log("err in get profile")
      }
      else{
            if(docs.length!= 0){
                
                res.render("Profile.html", {docs: docs});
            }
          else {
               res.redirect('/');
          }
      } });
});



//DELETE A DOCUMENT IN THE DATABASE / DEACTIVATE
router.get('/deleteform.html', function(req,res) {
    res.render("deleteform.html", {title: 'delete'});
});


/* GET to Delete User Service */
router.post('/deleteuser', function(req, res) 
{
    var uname = req.body.username;
    console.log(uname);
    var db = req.db;
    var collection = db.get('usercollection');
    console.log(req.params.username);

    // Submit to the DB
    collection.remove( { "username" : uname },
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Delete failed.");
                           }
                           else {
                               res.send("Successfully deleted " + uname);
                           }
                       });
});



// sarch based on fitness level
router.get('/searchreq',function(req,res)
            {
    res.render('searchreq');
});

router.post('/searchfl', function(req,res)
           {
    console.log("Hi");
       var db = req.db;
        var collection = db.get('usercollection');
        var fl = req.body.fitnesslevel;
    console.log(fl);
       // var Password = req.body.password;
        collection.find({ fitnesslevel: fl},{} , function(err,docs){
            if(err) {
                res.send("search failed");
            }
            else {
               res.render('userlist_fl', { 'docs':docs});
           
                
           
            }
        }) ;
                        


});



//UPDATE THE PASSWORD
router.get('/updateform', function(req,res) {
    
    res.render("updateform");
});

router.post('/updatelist', function(req,res)
           {
       var db = req.db;
        var collection = db.get('usercollection');
        var Email = req.body.useremail;
        var Uname = req.body.username;
        var Password = req.body.password;
        var Dob = req.body.dob;
        var Fitnesslevel = req.body.fitnesslevel;
        var image = req.body.confirm;
        
        collection.update( {email: Email}, { $set: {password : Password , fitnesslevel : Fitnesslevel , imageurl: image, dob: Dob , username: Uname } } , function(err,doc){
            if(err) {
                res.send("update failed");
            }
            else {
                res.send("updated details for " + Email);
            }
        }) ;
                        

});



/*
 * GET logout page.
 */
router.get('/logout', function(req, res)
{
    console.log("Logging out:");
    
    if (req.session.user)
    {
        console.log("inlogout session");
        console.log(req.session.user);
        var name = req.session.user.username;
        console.log("session name");
        console.log(name);
        
        req.session.destroy(function()
        {
            console.log(name + " logged out.");
        });
        
        res.send(name + " is now logged out.");
        
        /*
        var logout_content = fs.readFileSync("views/login.html", "utf-8");
        res.send(logout_content); */
    }
    else
    {
        
        console.log("else part");
        console.log("ERROR, not logged in, cant logout");
    }
});



module.exports = router;

