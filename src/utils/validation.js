// src/utils/validation.js
export const validatePost = (title, content) => {
  const errors = {};

  if (!title.trim()) {
    errors.title = 'Title is required';
  }
  else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters long';
  }
  else if (title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  if (!content.trim()) {
    errors.content = 'Content is required';
  }
  else if (content.length < 10) {
    errors.content = 'Content must be at least 10 characters long';
  }

  return errors;
};