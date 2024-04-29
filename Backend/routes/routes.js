module.exports = (app) => {

  const router = require('express').Router();
  const multer = require('multer');
  const storage = multer.memoryStorage(); 
  const upload = multer({ storage: storage });


  const controller = require('../controllers/controllers.js');




//swift aid start

    // GETTERS
  //user image getter
  router.get("/getUserImage/:id", controller.getUserImage);
  // user getters
  router.get("/getUsers", controller.getUsers);
  router.get("/getAdmin", controller.getAdmin);
  router.get("/getOperator", controller.getOperator);
  router.get("/getResponder", controller.getResponder);
  router.get("/getSingleOperator/:id", controller.getSingleOperator);
  router.get("/getSingleResponder/:id", controller.getSingleResponder);

  //post getter
  router.get("/getPost", controller.getPost);
  router.get("/getPostReport", controller.getPostReport);
  router.get("/getSinglePost/:id", controller.getSinglePost);
  router.get("/getSinglePostReport/:id", controller.getSinglePostReport);

    // POSTERS
    router.post('/addOperator', upload.single('image'), controller.addOperator);
    router.post('/addResponder', upload.single('image'), controller.addResponder);
    router.post('/addPost',upload.single(''), controller.addPost);
    router.post('/addPostTeam',upload.single(''), controller.addPostTeam);

    //editors
    router.put('/acknowledgePost/:id', controller.markPostAcknowledged);
    router.put('/denyPost/:id', controller.markPostDenied);
    router.put('/sendPost/:id', controller.markPostSent);
    router.put('/updatePost/:id', controller.updatePost);

  //DATASET
  router.get("/getDataset", controller.getDataset);




  app.use('/', router);
};
