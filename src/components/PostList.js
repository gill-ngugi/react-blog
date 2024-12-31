import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import '../styles/PostList.css';
import { useNavigate } from 'react-router-dom';

// Wrap the main component with a router-aware component
const PostListWithRouter = ({ posts, onEdit }) => {
  const navigate = useNavigate();
  const handleEdit = (postId) => {
    onEdit(postId);
    navigate(`/edit/${postId}`);
  };

  if (posts.length === 0) {
    return <div className="no-posts">No posts yet. Create one!</div>;
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          onEdit={() => handleEdit(post.id)}
        />
      ))}
    </div>
  );
};

 

// Original PropTypes remain the same

PostListWithRouter.propTypes = {

  posts: PropTypes.arrayOf(

    PropTypes.shape({

      id: PropTypes.string.isRequired,

      title: PropTypes.string.isRequired,

      content: PropTypes.string.isRequired

    })

  ).isRequired,

  onEdit: PropTypes.func.isRequired

};

 

// Create a wrapper component to handle the case where we can't use hooks directly

function PostList(props) {

  return <PostListWithRouter {...props} />;

}

 

PostList.propTypes = PostListWithRouter.propTypes;

 

export default PostList;

 