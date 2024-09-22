const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const createStorage = (dir) => multer.diskStorage({
  destination: (req, file, cb) => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadProfilePic = multer({ storage: createStorage('uploads/profile-pics') });
const uploadPostMedia = multer({ storage: createStorage('uploads/post-media') });

const readPosts = () => {
  const filePath = path.join(__dirname, 'data', 'posts.json');
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const posts = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(posts);
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
};

const writePosts = (posts) => {
  const filePath = path.join(__dirname, 'data', 'posts.json');
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  try {
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('Error writing posts:', error);
  }
};

const readUserData = () => {
  const filePath = path.join(__dirname, 'data', 'userData.json');
  if (!fs.existsSync(filePath)) {
    return { bio: '' };
  }
  try {
    const userData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error reading user data:', error);
    return { bio: '' };
  }
};

const writeUserData = (userData) => {
  const filePath = path.join(__dirname, 'data', 'userData.json');
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  try {
    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
  } catch (error) {
    console.error('Error writing user data:', error);
  }
};

app.post('/upload-profile-pic', uploadProfilePic.single('profilePic'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = `/uploads/profile-pics/${req.file.filename}`;
  return res.status(200).json({ message: 'Profile pic uploaded successfully!', filePath });
});

app.post('/posts', uploadPostMedia.single('media'), (req, res) => {
  const { text } = req.body;
  let mediaPath = null;
  let mediaType = null;

  if (req.file) {
    mediaPath = `/uploads/post-media/${req.file.filename}`;
    mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
  }

  const newPost = {
    id: Date.now(),
    text: text || '',
    mediaPath,
    mediaType,
    createdAt: new Date(),
  };

  try {
    const posts = readPosts();
    posts.unshift(newPost);
    writePosts(posts);
    return res.status(201).json({ message: 'Post created successfully!', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

app.get('/posts', (req, res) => {
  try {
    const posts = readPosts();
    return res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});

app.delete('/posts/:id', (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    let posts = readPosts();
    posts = posts.filter(post => post.id !== postId);
    writePosts(posts);
    return res.status(200).json({ message: 'Post deleted successfully!' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});

app.get('/user', (req, res) => {
  try {
    const userData = readUserData();
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
});

app.post('/user/bio', (req, res) => {
  try {
    const { bio } = req.body;
    const userData = readUserData();
    userData.bio = bio;
    writeUserData(userData);
    return res.status(200).json({ message: 'Bio updated successfully!', bio });
  } catch (error) {
    console.error('Error updating bio:', error);
    return res.status(500).json({ message: 'Error updating bio', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});