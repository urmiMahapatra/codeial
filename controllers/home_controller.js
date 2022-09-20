const Post = require ('../models/post');
const User = require ('../models/user');



module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id' , 25);
    // return res.render('home', {
    //     title: "Codil | Home",
    //     posts : posts
    // });
// populate of user of each user
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path :'user'
        }
    })
    .exec(function(err,posts){

        User.find({}, function(err,users){
            return res.render('home' ,{
                title: "Codial| Home",
                posts : posts,
                all_users: users
        });
       
        });

})
}


// module.exports.actionName = function(req, res){}