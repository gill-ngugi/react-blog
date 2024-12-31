// src/components/PostForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { validatePost } from '../utils/validation';
import '../styles/PostForm.css';
import { useNavigate, useParams } from 'react-router-dom';

function PostFormWithRouter({ onSubmit, editingPost, onUpdate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
      setErrors({});
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validatePost(title, content);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    try {
      if (editingPost) {
        await onUpdate({
          ...editingPost,
          title: title.trim(),
          content: content.trim(),
          updatedAt: new Date().toISOString()
        });
      } else {
        await onSubmit({ title: title.trim(), content: content.trim() });
      }
      setTitle('');
      setContent('');
      setErrors({});

      // Navigate back to the post list after successful submission
      navigate('/');
    } catch (error) {
      setErrors({ submit: 'Failed to submit post. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors({ ...errors, title: null });
          }}
          className={errors.title ? 'error' : ''}
        />

        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      <div className="form-group">
        <textarea

          placeholder="Post Content"

          value={content}

          onChange={(e) => {

            setContent(e.target.value);

            if (errors.content) setErrors({ ...errors, content: null });

          }}

          className={errors.content ? 'error' : ''}

        />

        {errors.content && <div className="error-message">{errors.content}</div>}

      </div>

 

      {errors.submit && <div className="error-message">{errors.submit}</div>}

 

      <div className="form-buttons">

        <button type="submit" disabled={isSubmitting}>

          {isSubmitting ? 'Submitting...' : editingPost ? 'Update Post' : 'Add Post'}

        </button>

        <button type="button" onClick={handleCancel} className="cancel-button">

          Cancel

        </button>

      </div>

    </form>

  );

}

 

PostFormWithRouter.propTypes = {

  onSubmit: PropTypes.func.isRequired,

  onUpdate: PropTypes.func.isRequired,

  editingPost: PropTypes.shape({

    id: PropTypes.string,

    title: PropTypes.string,

    content: PropTypes.string

  })

};

 

// Wrapper component to handle routing

function PostForm(props) {

  return <PostFormWithRouter {...props} />;

}

 

PostForm.propTypes = PostFormWithRouter.propTypes;

 

export default PostForm;