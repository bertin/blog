import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';                     // Import redux promise.

//import App from './components/app';                    // With React Router, we no longer display App from this file, but from the routes.js file instead.
import { Router, browserHistory } from 'react-router';   // import the React Router package installed by npm install --save react-router@2.0.0-rc5
import routes from './routes';                           // import the routes our application uses.

import reducers from './reducers';

// wire up redux promise by specifying "promise" in the first parenthesis.
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
   <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory} routes={routes} />
   </Provider>
   , document.querySelector('.container')
);

// We wire up React Router to our application by;
//    1. replacing the <App /> component by an instance of the React Router.
//    2. Tell React Router what routes are walid in our application, and which components to show for each of them.
//       => This is specified in the src/routes.js file
//       => the routes.js file is applied as a parameter "routes" to the <Router ... / > component.

// We want to use Reacact Router in the application so that React Router is in charge of
// deciding what views/coponents are showing on the screen at any given time.
// React Router is going to do that based on the contents of the url.

// The React Router library is installed by running:
//   npm install --save react-router@2.0.0-rc5
// This also installs the History javascript package,
//   that has ONE purpose, manages the url of the web-browser, watches the url for changes and has the ability to update it over time.
//   When the url of the browser is changed, the History package detects that, and sends a notification to React Router.
// The React Router inspects the url and depending on characteristics on that url, returns a set of React components (to React) that needs to be rendered.
// The user thinks they navigated to a totally different page, but it's still a SPA displaying different components.

// browserHistory is an object that tells React Router HOW to interpret changes to the url, what part it should care about.
// We have tree different versions we can use:
//    browserHistory: http://www.blog.com/post/5      Everything after the root url (http://www.blog.com) is used.
//    hashHistory: http://www.blog.com/#posts/5       Everything after the # is used.
//    memoryHistory: Does not use the url at all.
// browserHistory is NOT the History javascript package that is installed alongside React Router package.
