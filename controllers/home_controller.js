const Project = require("../models/project");
const db= require('../config/mongoose'); 
 

module.exports.home=function(req,res){
   Project.find({},function(err,projects){
      if(err){
          console.log("Error in fething from db");
          return;
      }
      return res.render('home',{
          title:"Home:Projects",
          project_list: projects
                              }); 
    
     });

   }
//function to create project
module.exports.create_project= function(req,res){
    Project.create({
        name:req.body.name,
        description:req.body.description,
        author:req.body.author
    },function(err,newProject){ 
    if(err){
        console.log("Error found",err);
        return;
    }
    console.log("*******",newProject);
    return res.redirect('back');
    });
}

//function to delete project
module.exports.delete_project=function(req,res){
    let id=req.query.id;

    Project.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error found");
            return;
        }
        return res.redirect('back');
    });
}

