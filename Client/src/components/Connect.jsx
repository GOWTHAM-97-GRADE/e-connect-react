import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled Components
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePhoto = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
`;

const Placeholder = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-radius: 50%;
  margin-right: 20px;
`;

const Counts = styled.div`
  display: flex;
  gap: 20px;
`;

const CountItem = styled.div`
  text-align: center;
`;

const PostCreation = styled.div`
  width: 80%;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  resize: none;
  padding: 10px;
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const UploadLabel = styled.label`
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
`;

const UploadInput = styled.input`
  display: none;
`;

const PostButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const PostsSection = styled.div`
  width: 80%;
`;

const PostTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  background-color: ${({ active }) => (active ? '#007bff' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PostItem = styled.div`
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-top: 10px;
  border-radius: 4px;
`;

const PostVideo = styled.video`
  width: 100%;
  max-height: 300px;
  margin-top: 10px;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
`;

const PostNote = styled.p`
  margin-top: 10px;
  white-space: pre-wrap;
`;

const BioSection = styled.div`
  width: 80%;
  margin-bottom: 20px;
`;

const BioTextArea = styled.textarea`
  width: 100%;
  height: 60px;
  resize: none;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 10px;
`;

const UpdateBioButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const Connect = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [newPost, setNewPost] = useState({
    text: '',
    media: null,
  });
  const [bio, setBio] = useState('');

  useEffect(() => {
    fetchPosts();
    fetchUserData();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/posts');
      setPosts(res.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get('http://localhost:4000/user');
      setBio(res.data.bio);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUploadProfilePhoto = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePic', file);

      try {
        const res = await axios.post('http://localhost:4000/upload-profile-pic', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setProfilePhoto(`http://localhost:4000${res.data.filePath}`);
      } catch (error) {
        console.error('Error uploading profile photo:', error);
      }
    }
  };

  const handlePostChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      setNewPost((prev) => ({
        ...prev,
        media: files[0],
      }));
    } else {
      setNewPost((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitPost = async () => {
    if (!newPost.text && !newPost.media) {
      alert('Please add some text or media to create a post.');
      return;
    }

    const formData = new FormData();
    formData.append('text', newPost.text);
    if (newPost.media) {
      formData.append('media', newPost.media);
    }

    try {
      const response = await axios.post('http://localhost:4000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewPost({ text: '', media: null });
      setPosts(prevPosts => [response.data.post, ...prevPosts]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/posts/${postId}`);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdateBio = async () => {
    try {
      await axios.post('http://localhost:4000/user/bio', { bio });
      alert('Bio updated successfully!');
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Photos') return post.mediaType === 'image';
    if (activeTab === 'Videos') return post.mediaType === 'video';
    return true;
  });

  return (
    <FlexContainer>
      <Header>
        <ProfileSection>
          {profilePhoto ? (
            <ProfilePhoto src={profilePhoto} alt="Profile" />
          ) : (
            <Placeholder>No Photo</Placeholder>
          )}
          <div>
            <div>{/* Add username or other info */}</div>
            <Counts>
              <CountItem>
                <strong>{posts.length}</strong>
                <div>Posts</div>
              </CountItem>
            </Counts>
          </div>
        </ProfileSection>
        <div>
          <UploadLabel htmlFor="upload-profile-pic">Edit PFP</UploadLabel>
          <UploadInput
            id="upload-profile-pic"
            type="file"
            accept="image/*"
            onChange={handleUploadProfilePhoto}
          />
        </div>
      </Header>

      <BioSection>
        <BioTextArea
          value={bio}
          onChange={(e) => setBio(e.target.prelace)}
          placeholder="Enter your bio..."
        />
        <UpdateBioButton onClick={handleUpdateBio}>Update Bio</UpdateBioButton>
      </BioSection>

      <PostCreation>
        <TextArea
          name="text"
          placeholder="What's on your mind?"
          value={newPost.text}
          onChange={handlePostChange}
        />
        <Actions>
          <div>
            <UploadLabel htmlFor="upload-media">Add Media</UploadLabel>
            <UploadInput
              id="upload-media"
              type="file"
              accept="image/*,video/*"
              name="media"
              onChange={handlePostChange}
            />
          </div>
          <PostButton onClick={handleSubmitPost}>Post</PostButton>
        </Actions>
      </PostCreation>

      <PostsSection>
        <PostTabs>
          {['All', 'Photos', 'Videos'].map((tab) => (
            <Tab
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Tab>
          ))}
        </PostTabs>
        <PostList>
          {filteredPosts.map((post) => (
            <PostItem key={post.id}>
              {post.text && <PostNote>{post.text}</PostNote>}
              {post.mediaPath && post.mediaType === 'image' && (
                <PostImage src={`http://localhost:4000${post.mediaPath}`} alt="Post media" />
              )}
              {post.mediaPath && post.mediaType === 'video' && (
                <PostVideo controls src={`http://localhost:4000${post.mediaPath}`} />
              )}
              <DeleteButton onClick={() => handleDeletePost(post.id)}>Delete</DeleteButton>
            </PostItem>
          ))}
        </PostList>
      </PostsSection>
    </FlexContainer>
  );
};

export default Connect;