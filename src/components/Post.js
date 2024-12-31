// src/components/Post.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Post.css';

function Post({ post, onEdit }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-footer">
        <button
          className="edit-button"
          onClick={() => onEdit(post.id)}
        >
          Edit Post
        </button>
        <span className="post-date">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Post;
