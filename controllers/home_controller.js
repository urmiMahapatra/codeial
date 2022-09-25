const Post = require ('../models/post');
const User = require ('../models/user');



module.exports.home =  async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id' , 25);
    // return res.render('home', {
    //     title: "Codil | Home",
    //     posts : posts
    // });


    try{
        // populate of user of each user
  let posts =  await Post.find({})
  .populate('user')
  .populate({
      path:'comments',
      populate: {
          path :'user'
      }
  });
 

  let users =  await  User.find({});
    
  return res.render('home' ,{
   title: "Codial| Home",
    posts : posts,
   all_users: users});

  }catch(err){
        console.log('Error',err);
        return;

    }
}

       
   


// module.exports.actionName = function(req, res){}