const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postid: { type: mongoose.Schema.Types.ObjectId, auto: true },  // MongoDB auto-generated ID
  content: { type: String, required: true },
  images: [{ type: String }],  // List of image IDs
  time: { type: Date, default: Date.now },
  author: { type: String, required: true }  // Username of the author
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
