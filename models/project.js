const mongoose = require('mongoose');

const projectSchema =new mongoose.Schema({   // project nosql scchema
name:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
author:{
    type:String,
    required:true
}
});

// keep first letter capital for collection/model name
const Project=mongoose.model('project',projectSchema); // inside model(name of model,schema)

module.exports=Project;