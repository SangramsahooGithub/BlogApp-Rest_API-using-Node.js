import commentModel from "../model/commentModel.js";

//Post a  comment
export const postComment = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.send({ success: false, message: "name is Required" });
    }
    const comment = await new commentModel({
      name,
      blog: req.params.blogid,
      user: req.user._id,
    }).save();
    res.status(200).send({
      success: true,
      message: "comments Created Successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during postcomment",
      error,
    });
  }
};

//only admin can see all comments
export const getallComments = async (req, res) => {
  try {
    const comments = await commentModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("user");
    res.status(200).send({
      success: true,
      comments: comments.length,
      message: "All comments  fetched",
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during getallcomments",
      error,
    });
  }
};

//find comment under particular post
export const blogComment = async (req, res) => {
  try {
    const blogId = req.params.blogid;
    const comment = await commentModel.find({ blog: blogId }).populate("user");
    if (!comment || comment.length === 0) {
      return res.send({
        success: false,
        message: "No comment found for this blog ! sorry",
      });
    }
    res.status(200).send({
      success: true,
      message: "comments as per the  blog",
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during fetching comment",
      error,
    });
  }
};

//update comment (users can update only there own comments)
export const updateComment = async (req, res) => {
  try {
    const { name } = req.body;
    const comment = await commentModel.findOne({ _id: req.params.id });
    if (comment.user._id == req.user._id) {
      const updatedcomment = await commentModel.findByIdAndUpdate(
        comment,
        { name },
        { new: true }
      );
      res.status(201).send({
        success: true,
        message: "comment updated Successfully",
        updatedcomment,
      });
    } else {
      res.send({
        success: false,
        message:
          "This comment is not belongs to you ! so you can't update this one ",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during updatecomment",
      error,
    });
  }
};

//delete comment (users can delete only there own comment)
export const deleteComment = async (req, res) => {
  try {
    const comment = await commentModel.findOne({ _id: req.params.id });
    if (comment.user._id == req.user._id) {
      await commentModel.findByIdAndDelete(comment);
      res.status(200).send({
        success: true,
        message: "comment  Deleted successfully",
      });
    } else {
      res.send({
        success: false,
        message: "blog owner only access to delete the comment ",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during delete comment",
      error,
    });
  }
};
