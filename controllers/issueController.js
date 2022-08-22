const Project = require("../models/project");
const Issue = require("../models/issue");
const db= require('../config/mongoose'); 

//function for get call
module.exports.project_detail_GET=function(req,res){
    let id = req.query.id;
    Project.findById(id, function(err,project){
        if(err){
            console.log('error in deleting an object from database');
            return
        }
        Issue.find({project: id}, function(err,issues){
            // console.log(issues);
            return res.render('issuePage',{
                title:"ISSUE:Projects",
                project_info: project,
                issues: issues
            });
        })
        
    })
}
//functionfor POST cALL
module.exports.project_detail_POST=function(req,res){
    let id = req.query.id;
    Project.findById(id, function(err,project){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        if(req.body.title && req.body.filterByAuthor && req.body.filterByLabel){
            Issue.find({$and: [{'project': id }, {'title': req.body.title},{'author': req.body.filterByAuthor},{'label': req.body.filterByLabel}]}, function(err,issues){
                // console.log(issues);
                return res.render('issuePage',{
                    title:"ISSUE:Projects",
                    project_info: project,
                    issues: issues
                });
            })
        }else if(req.body.title && req.body.filterByAuthor){
            Issue.find({$and: [{'project': id }, {'title': req.body.title},{'author': req.body.filterByAuthor}]}, function(err,issues){
                // console.log(issues);
                return res.render('issuePage',{
                    title:"ISSUE:Projects",
                    project_info: project,
                    issues: issues
                });
            })

        }else if(req.body.filterByAuthor && req.body.filterByLabel){
            Issue.find({$and: [{'project': id },{'author': req.body.filterByAuthor},{'label': req.body.filterByLabel}]}, function(err,issues){
                // console.log(issues);
                return res.render('issuePage',{
                    title:"ISSUE:Projects",
                    project_info: project,
                    issues: issues
                });
            })

        }else if(req.body.title && req.body.filterByLabel){
            Issue.find({$and: [{'project': id }, {'title': req.body.title},{'label': req.body.filterByLabel}]}, function(err,issues){
                // console.log(issues);
                return res.render('issuePage',{
                    title:"ISSUE:Projects",
                    project_info: project,
                    issues: issues
                });
            })

        }else if(req.body.title || req.body.filterByAuthor || req.body.filterByLabel){
            Issue.find({$and: [{'project': id }, {$or:[{'title': req.body.title},{'author': req.body.filterByAuthor},{'label': req.body.filterByLabel}]}]}, function(err,issues){
                // console.log(issues);
                return res.render('issuePage',{
                    title:"ISSUE:Projects",
                    project_info: project,
                    issues: issues
                });
            })
        }else{
            return res.redirect('back');
        }
    })
}
// function for creating issue
module.exports.create_issue=function(req,res){
    let id = req.query.id;
    Project.findById(id, function(err,project){
        if(err){
            console.log('error in deleting an object from database');
            return
        }
        Issue.find({project: id}, function(err,issues){
            // console.log(issues);
            return res.render('create_issue',{
                title:"Create Issue",
                project_info: project,
                issues: issues
            });
        })

    })
}

module.exports.list_issue=function(req,res){
    let id = req.query.id;
    console.log(id);

    Issue.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        label: req.body.label,
        project: id
    }, function(err, newIssue){
        if(err){
            console.log('error in creating a issue');
            return;
        }
        // console.log('########',newIssue);
        return res.redirect(`/project-detail/?id=${id}`);

    });
}

module.exports.delete_issue=function(req,res){
    let id = req.query.id;
    Issue.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
}