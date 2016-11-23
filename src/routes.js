import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

export default (
   <Route path="/" component={App} >
      <IndexRoute component={PostsIndex} />
      <Route path="posts/new" component={PostsNew} />
      <Route path="posts/:id" component={PostsShow} />
   </Route>
);

// The path "/" refers to the root domain name, like "http://www.blog.com/"
// The <Route ...> is where we house/define all our mapping between the diffetent url/path and the componets that we want to show.

// Nested routes / children.
// A <Route> elements that is placed inside another <Route> element is condidered as the outer <Route>'s (nested) children.
// To render those children, we specify WHERE to render those children by placing a {this.props.children}
// at the place we want to render the children. Please see inside app.js render() method.

// We want the App to be our root container/component of our application. This way it will be pretty easy to add things like
// a header, menu, footer, etc that would show up on all the other pages/components.

// The IndexRoute is another feature of React Router.
// The IndexRoute is a helper that behaves like a route, but only will be show when;
//    => the url mathes up by the path defined by the parent route
//    => but is not defined by any of the other children routes.
// The IndexRoute does not need a path.
//
// URL PARAMETERS IN ROUTES.
// The route to view an individual post is "posts/5", to view the blog with id === 5.
// To have it in the url like this makes it possible to bookmark the blog item as well, and allways be able to see the same blog post show up again.
// We then needs to make sure to fetch the blog post with the id from the url from the backend service.
// So we need a way to extract the id from the url.
// We accomplish this by specyfiing "/:id" in the path for the Route, see (line 13 above).
// React Router will pull this id from the url, and pass it into the component as "this.props.params.id".
