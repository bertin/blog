import { FETCH_POSTS, FETCH_POST } from '../actions/index';

// Definition of initial state.
//   "all" holds all the blog posts in our application,
//   "post" holds the currently selected blog post.
const INITIAL_STATE = { all: [], post: null };

// Definition of the "fetchPosts" reducer.
export default function(state = INITIAL_STATE, action) {
   console.log('Action received in reducer_posts:', action);
   switch (action.type) {
      case FETCH_POSTS:                                     // When a list of all posts have been retrieved.
         return { ...state, all: action.payload.data };     // Use of the spread operator to flatten out what already is on the state array, and adding the content from the payload to the "all" key.
      case FETCH_POST:                                      // When a single blog post have been retrieved.
         return { ...state, post: action.payload.data };     // Use of the spread operator to flatten out what already is on the state array, and adding the content from the payload to the "post" key.
      default:
         return state;
   }
}
