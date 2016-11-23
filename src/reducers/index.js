import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';  // import the "reducer" property from "redux-form", make it available tru a variable named "formReducer".

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;

// The formReducer should be assigned to the state with a key property named "form",
