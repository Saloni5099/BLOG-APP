const express = require('express');
const { getAllBlogsController,
        createBlogsController,
        updateBlogsController,
        getBlogByIdController,
        deleteBlogsController,
        userBlogController
      } = require('../controllers/blogController');

const router = express.Router();

//routes

//all blogs||GET
router.get('/all-blog',getAllBlogsController);

//create blogs||POST
router.post('/create-blog',createBlogsController);

//update blog||PUT
router.put('/update-blog/:id',updateBlogsController);

//Single blog details||GET
router.get('/get-blog/:id',getBlogByIdController);

//Delete blog ||DELETE
router.delete('/delete-blog/:id',deleteBlogsController);

//user blog||GET
router.get('/user-blog/:id',userBlogController);
//export
module.exports = router;