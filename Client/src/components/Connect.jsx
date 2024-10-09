import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Connect = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  
  const [cookies] = useCookies(['username']);
  const username = cookies.username;

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/posts');
      setPosts(response.data.posts); // Update to match your backend response structure
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle new post creation
  const handlePost = async (e) => {
    e.preventDefault();

    if (newPostText.trim() === '') {
      alert('Post text cannot be empty');
      return;
    }

    try {
      const newPost = {
        content: newPostText,
        author: username,  // Automatically filled
        images: [], // Adjust as needed for images
      };

      await axios.post('http://localhost:8000/posts', newPost);
      setNewPostText(''); // Clear input
      fetchPosts(); // Refresh posts after posting
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  };

  // Handle delete post
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8000/posts/${postId}`);
      fetchPosts(); // Refresh posts after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="connect-page">
      <style>
        {`
          .connect-page {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px; /* Added padding */
            background-color: #f9f9f9; /* Light background for the page */
            border-radius: 8px; /* Rounded corners */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
          }

          h2 {
            text-align: center; /* Center the title */
            color: #333; /* Dark text color for title */
          }

          textarea {
            width: 100%;
            height: 100px;
            margin-bottom: 10px;
            padding: 10px; /* Padding inside textarea */
            border: 1px solid #ccc;
            border-radius: 4px; /* Rounded corners for textarea */
            resize: none; /* Prevent resizing */
            font-size: 16px; /* Larger text size */
          }

          button {
            padding: 10px 15px; /* Button padding */
            background-color: #007bff; /* Bootstrap primary color */
            color: white; /* White text on button */
            border: none;
            border-radius: 4px; /* Rounded corners for button */
            cursor: pointer;
            font-size: 16px; /* Larger text size */
            margin-bottom: 20px; /* Space below button */
            transition: background-color 0.3s; /* Smooth color transition */
          }

          button:hover {
            background-color: #0056b3; /* Darker blue on hover */
          }

          .posts-list {
            margin-top: 20px;
          }

          .post {
            border: 1px solid #ccc;
            padding: 15px; /* Increased padding for posts */
            margin-bottom: 15px; /* Increased margin */
            border-radius: 4px; /* Rounded corners for posts */
            background-color: #fff; /* White background for posts */
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
            position: relative; /* Positioning for delete icon */
          }

          .post-content {
            padding-right: 30px; /* Add padding for content */
            display:"flex
          }

          .post-content p {
            margin: 0; /* Remove default margin */
            color: #555; /* Dark gray for post content */
          }

          .delete-icon {
            background: none;
            border: none;
            cursor: pointer;
            color: red; /* Change as needed */
            font-size: 20px; /* Larger delete icon */
            position: absolute; /* Position icon absolutely */
            top: 10px; /* Align at the top */
            right: 10px; /* Align to the right */
          }
        `}
      </style>

      <h2 style={{padding:"24px"}}>Posts</h2>
      <form onSubmit={handlePost}>
        <textarea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <button type="submit">Post</button>
      </form>
      
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div className="post-content">
              <p>{post.content}</p>
              <span style={{color: "green"}}>By: {post.author}</span>
            </div>
            {post.author === username && (
              <button onClick={() => handleDelete(post._id)} className="delete-icon">
                🗑️ {/* Replace with your delete icon */}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connect;
