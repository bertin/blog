import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';      // Because of the shortcut notation, we no longer need to import bindActionCreators.
import { fetchPosts } from '../actions/index';     // Import the fetchPosts action creator.
import { Link } from 'react-router';               // Import the Link component from React Router.

class PostsIndex extends Component {

   componentWillMount() {
      this.props.fetchPosts();                     // Call the fetchPosts action creator to fetch posts from the backend service.
   }

   // Helper function to render the list of of blog posts.
   renderBlogPosts() {
      return this.props.posts.map((post) => {
         return (
            <li className="list-group-item" key={post.id}>
               <Link to={`posts/${post.id}`}>
                  <span className="pull-xs-right">{post.categories}</span>
                  <strong>{post.title}</strong>
               </Link>
            </li>
         );
      });
   }

   render () {
      return (
         <div>
            <div className="text-xs-right">
               <Link to="/posts/new" className="btn btn-primary">Nytt blogginnlegg</Link>
            </div>
            <h3>Bloginnlegg</h3>
            <ul className="list-group">
               {this.renderBlogPosts()}
            </ul>
         </div>
      );
   }
}

// The state is the Redux application state.
function mapStateToProps(state) {
   // Whatever is returned as a key from this object, becomes available at "this.props", like "this.props.posts" in our case.
   // Looking at the "reducers.index.js" file we see that the "posts" piece of the state is managed by the "fetchPosts" reducer.
   // Looking at the "fetchPosts" reducer, we see that ths list of all blog posts are stored in the "all" piece of the state.
   return {
      posts: state.posts.all
   };
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);

// SHORTCUT, instead of using this boilerplate code;
//    function mapDispatchToProps(dispatch) {
//       return bindActionCreators( {fetchPosts}, dispatch );
//    }
//    export default connect(null, mapDispatchToProps)(PostsIndex);
// We can just use;
//    export default connect(null, {fetchPosts: fetchPosts})(PostsIndex);
// By es6 syntactical sugar we can condence it futher to;
//    export default connect(null, {fetchPosts})(PostsIndex);

// REACT LIFECYCLE METHOD.
// A React Lifecycle method is a function on a React component class that is automatically called by React.
// There are several different lifecycle methods, but we will use "componentWillMount".
// The componentWillMount will be called when the component is about to be rendered to the dom for the first time.

// LINK COMPONENT
// React Router has what is called a link compnenet.
// It is used to link a component from one route to another.
// It is an actual react component that show up as actual html, it renders as an anker tag, an <a> tag.
// It is probably one of the best features of React Router.
// Since it manifests itself as a ancher-tag, it behaves like one as well,
// if you right-click the link and choose "open in a new tab" you get the new component in a new tab. This is really a good feature.
