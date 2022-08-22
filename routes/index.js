const express=require('express');
const homeController=require('../controllers/home_controller');
const issueController=require('../controllers/issueController');
const router=express.Router();

console.log("router is running");

router.get('/',homeController.home);
router.get('/delete-project',homeController.delete_project);
router.get('/project-detail',issueController.project_detail_GET);
router.get('/create-issue',issueController.create_issue);
router.get('/delete-issue',issueController.delete_issue);


router.post('/created-issue',issueController.list_issue);
router.post('/create-project',homeController.create_project);
router.post('/project-detail',issueController.project_detail_POST);



// for any routes use from here
// router.use('/path',require('route to directory'));

module.exports=router;