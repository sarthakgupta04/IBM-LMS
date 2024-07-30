const User=require('./models/user');

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("admin", salt, function(err, hash) {
        if(err){
            console.log(err);
            return;
        }
        else{
            const info={
                email:"admin123@admin.com",
                phone:98,
                name:"admin",
                password:hash,
                loans:[],
                userType:"admin",
                isApproved:true
            }
            User.create(info,function(err){
                if(err){
                    console.log(err);
                    
                }
                return;
            })
        }
    });
});