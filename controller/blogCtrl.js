import blogModel from "../model/blogModel.js";
import userModel from "../model/userModel.js";

//create blog
export const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.send({ success: false, message: "title is Required" });
    }
    if (!description) {
      return res.send({ success: false, message: "description is Required" });
    }
    const exisitingblog = await blogModel.findOne({ title });
    if (exisitingblog) {
      return res.status(200).send({
        success: false,
        message: "Blog name is already exists !  Plz choose another name ",
      });
    }
    const blogs = await new blogModel({
      title,
      description,
      user: req.user._id,
    }).save();
    res.status(200).send({
      success: true,
      message: "blog Created Successfully",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during createblog",
      error,
    });
  }
};

//get all blogs
export const getallBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      blogTotal: blogs.length,
      message: "All blogs fetched",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during getallblogs",
      error,
    });
  }
};

//get single blog details
export const getsinglBlogDetails = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ _id: req.params.id });
    if (!blog) {
      return res.send({ success: false, message: "sorry! blog not found" });
    }
    res.status(200).send({
      success: true,
      message: "Single blog Fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during fetch single blogs",
      error,
    });
  }
};

//get blogs according to users
export const userBlog = async (req, res) => {
  try {
    const userId = req.params.id;
    const blogs = await blogModel.find({ user: userId });
    if (!blogs || blogs.length === 0) {
      return res.send({
        success: false,
        message: "No blogs found for this user",
      });
    }
    res.status(200).send({
      success: true,
      message: "User's blogs",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during fetching user's blogs",
      error,
    });
  }
};

//update blog (users can update only there own blogs)
export const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const blog = await blogModel.findOne({ _id: req.params.id });
    if (blog.user._id == req.user._id) {
      const updatedblog = await blogModel.findByIdAndUpdate(
        blog._id,
        { title, description },
        { new: true }
      );
      res.status(201).send({
        success: true,
        message: "blog Updated Successfully",
        updatedblog,
      });
    } else {
      res.send({
        success: false,
        message:
          "This blog is not belongs to you ! so you cant update this one ",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during updateblogs",
      error,
    });
  }
};

//delete blog (users can delete only there own blogs)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ _id: req.params.id });
    if (!blog) {
      return res.send({
        success: false,
        message: "No blog found",
      });
    }
    if (blog.user._id == req.user._id) {
      await blogModel.findByIdAndDelete(blog._id);
      res.status(200).send({
        success: true,
        message: "blog  Deleted successfully",
      });
    } else {
      res.send({
        success: false,
        message:
          "This blog is not belongs to you ! so you cant delete this one ",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during delete blog",
      error,
    });
  }
};
