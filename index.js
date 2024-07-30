const express=require('express'); 
const app = express();
const cors = require('cors');
const port = 8000;
const db = require('./config/mongoose');
const bcrypt=require('bcryptjs');
// using passport-jwt 
const passportJwt = require('./config/passport-jwt-strategy');

// const User=require('./models/user');

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("admin", salt, function(err, hash) {
//         if(err){
//             console.log(err);
//             return;
//         }
//         else{
//             const info={
//                 email:"admin123@admin.com",
//                 phone:98,
//                 name:"admin",
//                 password:hash,
//                 loans:[],
//                 userType:"admin",
//                 isApproved:true
//             }
//             User.create(info,function(err){
//                 if(err){
//                     console.log(err);
                    
//                 }
//                 return;
//             })
//         }
//     });
// });

// middleware parser to get the form values as the body object in request 
app.use(cors());
app.use(express.urlencoded());

// using express router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

module.exports=app;