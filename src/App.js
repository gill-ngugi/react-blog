// src/App.js

import React, { Component } from 'react';

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import PostList from './components/PostList';

import PostForm from './components/PostForm';

import ErrorBoundary from './components/ErrorBoundary';

import './styles/App.css';



class App extends Component {

  constructor(props) {

    super(props);

    this.state = {

      posts: [],

      editing: null,

      error: null

    };

  }



  handleAddPost = (newPost) => {

    try {

      const post = {

        ...newPost,

        id: crypto.randomUUID(),

        createdAt: new Date().toISOString()

      };

      this.setState(prevState => ({

        posts: [...prevState.posts, post],

        error: null

      }));

    } catch (error) {

      this.setState({ error: 'Failed to add post' });

    }

  }



  handleUpdatePost = (updatedPost) => {

    try {

      this.setState(prevState => ({

        posts: prevState.posts.map(post =>

          post.id === updatedPost.id ? updatedPost : post

        ),

        editing: null,

        error: null

      }));

    } catch (error) {

      this.setState({ error: 'Failed to update post' });

    }

  }



  setEditing = (postId) => {

    this.setState({ editing: postId });

  }



  render() {

    const { posts, editing, error } = this.state;

    return (

      <Router>

        <div className="App">

          <nav>

            <Link to="/">Home</Link>

            <Link to="/new-post">Create Post</Link>

          </nav>



          {error && <div className="error-message">{error}</div>}

          <ErrorBoundary>

            <Routes>

              <Route

                path="/"

                element={<PostList posts={posts} onEdit={this.setEditing} />}

              />

              <Route

                path="/new-post"

                element={

                  <PostForm

                    onSubmit={this.handleAddPost}

                    editingPost={posts.find(post => post.id === editing)}

                    onUpdate={this.handleUpdatePost}

                  />

                }

              />

              <Route
                path = "/edit/:id"
                element = {
                  <PostForm
                    editingPost = {posts.find(post => post.id === editing)}
                    onUpdate = {this.handleUpdatePost}
                  />
                }
                />

            </Routes>

          </ErrorBoundary>

        </div>

      </Router>

    );

  }

}



export default App;