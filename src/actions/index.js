// This file contains all action creators.
import axios from 'axios';

// Definition of all action types constatnts.
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

// Constants for the herokuapp backend service.
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=bertinhansen';

// The fetchPosts action creator fetches posts from the backend service, and creates an action with the promise as a payload.
export function fetchPosts() {
   const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);      // Uses axios to make the asyncronous call to the backend service.
   return {
      type: FETCH_POSTS,
      payload: request
   };
}
// Now, where is this action creator called from?
// Look at the PostsIndex component (in the posts_index.js file),
// there we use the componentWillMount React Lifecycle method to call this action creator.

// The createPost action creator calls the backend service to create a new blog post.
// The props parameter contains the value of the fields in the form; the title, categories, and content.
export function createPost(props) {
   const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);
   return {
      type: CREATE_POST,
      payload: request
   }
}

// The fetchPost action creator fetches a single post from the backend service, and creates an action with the promise as a payload.
export function fetchPost(post_id) {
   const request = axios.get(`${ROOT_URL}/posts/${post_id}${API_KEY}`);
   return {
      type: FETCH_POST,
      payload: request
   }
}

// The deletePost action creator deletes a single blog post by calling the backend service.
export function deletePost(post_id) {
   const request = axios.delete(`${ROOT_URL}/posts/${post_id}${API_KEY}`);
   return {
      type: DELETE_POST,
      payload: request
   }
}
