module.exports.home=function(req,res){
    //sending a response with cookies 
    console.log(req.cookies);
    res.cookie('user_id',25)

    return res.render('home',{
        title:"home"
    });
}