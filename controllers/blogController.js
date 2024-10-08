const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

exports.getAllBlogsController = async(req,res) => {
    try {
       const blogs = await blogModel.find({}).populate("user");
       if(!blogs){
        return res.status(400).send({
            success:false, 
            message:"No Blogs Found",
        });
       } 
       return res.status(200).send({
        success:true,
        message:"All Blog Lists",
        BlogCount:blogs.length,
        blogs,
       })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in getting all blogs",
            error,
        });
    }
    
}

exports.createBlogsController = async(req,res) => {
    try {
        const {title,description,image,user} = req.body;
        //validation
        if(!title||!description||!image||!user){
            return res.status(400).send({
                success:false,
                message:"provide all fields",
                
            });
        }
        //save
        const existingUser = await userModel.findById(user);
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:"unable to find user",
                
            })
        }
        const newBlog = new blogModel({title,description,image,user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success:true,
            message:"Blog created",
            newBlog,
        });
    
    } catch (error) {
        console.log(error)
            return res.status(500).send({
                message:'Error In creating blog',
                success:false,
                error,
    });
}
}

exports.updateBlogsController = async(req,res) => {
    try {
        const {id} = req.params;
        const {title,description,image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(
            id,
            {...req.body},
            {new: true}
        )
        return res.status(200).send({
            success:true,
            message:"Blog updated!",
            blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in updating blog",
            error,
        });
    }
}

exports.getBlogByIdController = async(req,res) => {
    try {
        const {id} = req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
            return res.status(404).send({
                success:false,
                message:"blog not found!",
            });
        }
        return res.status(200).send({
            success:true,
            message:"fetched single blog ",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error while getting single blog",
            error,
        })
    }
}

exports.deleteBlogsController = async(req,res) => {
    try {
        const blog =  await blogModel
        .findByIdAndDelete(req.params.id)
        .populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:"blog deleted Successfully!",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"error while deleting blog",
            error,
        });
    }
};

exports.userBlogController = async(req,res)=>{
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:"blogs not found with this id",
            }); 
        }
        return res.status(200).send({
            success:true,
            message:"user Blogs",
            userBlog,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"error in user blog",
            error,
        })
    }
}


