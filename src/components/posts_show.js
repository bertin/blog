import React, { Component, PropTypes } from 'react';              // PropTypes gives us access to the component's application context.
import { connect } from 'react-redux';                            // Import the connect helper method to connect the action creator to the component.
import { fetchPost, deletePost } from '../actions/index';         // Import the fetchPost action creator to fetch a single blog post.
import { Link } from 'react-router';                              // Import the Link component from React Router.

class PostsShow extends Component {

   // Get access to the React Router via "this.context.router", so that we vcan call the routers push helper method, to navigate to another route.
   static contextTypes = {
      router: PropTypes.object
   };

   componentWillMount() {
      this.props.fetchPost(this.props.params.id);      // React Router will pull the id from the url, and pass it into the component as "this.props.params.id". See src/routes.js for more details.
   }

   // Helper method to delete a single blog post.
   onDeleteClick() {
      // The deletePost action creator is returning a promise. We can chain on to that promise with the ".then" callback function.
      this.props.deletePost(this.props.post.id)
         .then(() => { this.context.router.push('/'); });
   }

   render() {
      const { post } = this.props;

      if (!post) {
         return <div>Henter bloginnhold...</div>
      }

      return (
         <div>
            <Link to="/">Tilbake til bloggliste</Link>
            <button
               onClick={ this.onDeleteClick.bind(this) }
               className="btn btn-danger pull-xs-right">
               Slett bloginnhold
            </button>
            <h3>{post.title}</h3>
            <h6>Kategorier: {post.categories}</h6>
            <p>{post.content}</p>
         </div>
      );
   }
}

// The state is the Redux application state.
function mapStateToProps(state) {
   // Whatever is returned as a key from this object, becomes available at "this.props", like "this.props.post" in our case.
   // Looking at the "reducers.index.js" file we see that the "posts" piece of the state is managed by the "fetchPosts" reducer.
   // Looking at the "fetchPosts" reducer, we see that a single post is stored in the "post" piece of the state.
   return {
      post: state.posts.post
   }
}

export default connect( mapStateToProps, { fetchPost, deletePost } )( PostsShow );
