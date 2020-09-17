const express=  require('express');
const multer = require('multer')
const path = require("path")
const userRoute = express.Router();
const User = require("./userSchema")
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
   
  }).single("profile_image");

userRoute.get('/list',async(req,res)=>{
    try {
        const result = await User.find();
        res.status(200).send(result);
    } catch (error) {
        res.status("404").status("can not get the result");
    }
})
userRoute.delete('/deleteUser', async (req,res)=>{
    const {email}= req.body;
    try{
        const result = await User.deleteOne ({email: email});
        res.status(200).send("user Deleted")
    }catch(error){
        res.status(404).send(error);
    }
})
userRoute.post('/updateUser', async(req,res)=>{
    upload(req, res, async (err) => {
        console.log("req", req.file, req.body)
        if(err){
            res.send( err
            );
        } else {
            console.log("req.file", req.file)
            let profile_image= req.file.filename
          if(req.file == undefined){
            profile_image: ''
          }
        
              const {email, phone_number, first_name, last_name}= req.body;
              
              try {
                  const result= await User.updateOne({email}, {$set: {email, phone_number, first_name, last_name, profile_image}})
                  res.status(200).send("User Updated");
                } catch (error) {
                    res.status(404).send("error in updating user.");
                }
            }
          
        });
});
userRoute.post('/insertUser', async(req,res)=>{
    const {email, phone_number, first_name, last_name}= req.body;

try {
 const re =await User.findOne({email});
 if(re){
     res.status(200).send("Email exists");
 }else{

    upload(req, res, async (err) => {
        console.log("req", req.file, req.body)
        if(err){
            res.send( err
            );
        } else {
            console.log("req.file", req.file)
            let profile_image= req.file.filename
          if(req.file == undefined){
            profile_image: ''
          }
        
              const {email, phone_number, first_name, last_name}= req.body;
              
              try {
                  const result= await User.create( {email, phone_number, first_name, last_name, profile_image})
                  res.status(200).send("User Inserted");
                } catch (error) {
                    res.status(404).send("error in updating user.");
                }
            }
          
        });
    }
} catch (error) {
    res.status(404).send("error in updating user.");
}
});
module.exports =userRoute;