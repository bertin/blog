import React, { Component, PropTypes } from 'react';  // PropTypes gives us access to the component's application context.
import { reduxForm } from 'redux-form';               // Import the eduxForm helper method, nearly identical to the connect helper function from the react-redux library.
import { createPost } from '../actions/index';        // Import the createPosts action creator.
import { Link } from 'react-router';                  // Import the Link component from React Router.

class PostsNew extends Component {
   // Get access to the context, to get access to the React Router, so that we can call the React Router push helper method.
   // Here we are defining an object, called contextTypes, on the PostsNew class.
   // Whenever an instance of PostsNew is created, React is going to see that we declared a contextTypes,
   // and it sees that we specifically want access to the property on our context called "router".
   // React is then going to search oll of this components parents, until it finds a component
   // that has a piece of context called "router", in our case all the way back to the src/index.js file,
   // and this router is going to provide the context for us, giving us access to all the routes in our application.
   // Basically this next static declaration is giving us acces to a property called "this.context.router" inside of our PostsNew component.
   static contextTypes = {
      router: PropTypes.object
   };

   onSubmit(props) { // The pops parameter is properties from the forn, the title, categories, and content. It is NOT the same as "this.props".
      // The createPost action creator is returning a promise. We can chain on to that promise with the ".then" callback function.
      this.props.createPost(props)
      .then(() => {
         // Blog post has been created, navigate the user to the index.
         // We navigate by calling this.context.router.push helper method, with the new path to navigate to.
         this.context.router.push('/');
      });
   }

   render() {
      const { fields: { title, categories, content }, handleSubmit } = this.props;
      // the above line is the same as writing:
      //   const title = this.props.fields.title;
      //   const categories = this.props.fields.categories;
      //   const content = this.props.fields.content;
      //   const handleSubmit = this.props.handleSubmit;
      //console.log(title);
      return(
         <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <h3>Lag et nytt Bloginnlegg</h3>

            <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
               <label>Tittel</label>
               <input type="text" className="form-control" {...title} />
               <div className="text-help">
                  { title.touched ? title.error : "" }
               </div>
            </div>

            <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
               <label>Kategorier</label>
               <input type="text" className="form-control" {...categories} />
               <div className="text-help">
                  { categories.touched ? categories.error : "" }
               </div>
            </div>

            <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
               <label>Innhold</label>
               <textarea className="form-control" {...content} />
               <div className="text-help">
                  { content.touched ? content.error : "" }
               </div>
            </div>

            <button type="submit" className="btn btn-primary">Lagre</button>
            <Link to="/" className="btn btn-danger">Avbryt</Link>
         </form>
      );
   }
}

// validate is called with the values from the fields of the form, as specified in the configuration object to the reduxForm helper method.
function validate(values) {
   const errors = {};

   if ( !values.title ) {
      errors.title = 'Du må oppgi en tittel på ditt nye bloginnlegg';
   }

   if ( !values.categories ) {
      errors.categories = "Du må oppgi minst én kategori for ditt nye bloginnlegg";
   }

   if ( !values.content ) {
      errors.content = "Du må skrive et innhold for ditt mye bloginnlegg"
   }

   return errors;
}

// Difference between connect and reduxForm helper methods.
// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps.
// reduxForm: 1st argument is config, 2nd is mapStateToProps, 3rd is mapDispatchToProps.

// This is where we pass in our configuration to reduxForm, as a javacript object, the "letter" that is sent to reduxForm.
export default reduxForm({
   form: 'PostsNewForm',
   fields: ['title', 'categories', 'content'],
   validate
}, null, { createPost })(PostsNew);
//
// The reduxForm is a helper method to make the connection between our form and the Redux Form.
// Just as with the connect helper, the reduxForm helper injects properties on the "this.props" property.
// this.props.handleSubmit is a callback funtion called by Redux Form when the user submits the form.
// this.props.fields is a javascript object that contains the "field configuration object" for the fields in our form.
//
// Behind the scene magic: User enters something in ... Redux Form records it on the Redux application state.
// The "form" key above binds this to the "form" key (in the application state) in the "reducers/index.js" file.
// So that the application state will look like this:
// state === {
//    form: {
//       PostsNewForm: {
//          title: 'whatever user enters in the field',
//          categories: 'whatever user enters in the field',
//          content: 'whatever user enters in the field'
//       }
//    }
// }
// Whenever the user makes changes to the field inputs in the form, the reduxForm reducer is setting the values at the appropriate fields in the Redux application state.
//
// REDUX FORM
// Redux form is probably one of the best libraries around redux. It is really a pleasure to use.
// Documentation on: https://github.com/erikras/redux-form
// Redux Form homepage: http://erikras.github.io/redux-form/#/?_k=ap86kh
// Getting started guide: http://erikras.github.io/redux-form/#/getting-started?_k=nn2iqo
//
// 0. First we hook up the Redux Form reducer to our reducers, inside the reducers/index.js
//
// Redux form, behind the scene "letter conversation".
// 1. Dear Redux Form, you are in charge of a form called "PostsNew", you need to keep tract of three field inputs, they are; title, categories, content.
// 2. Redux Form reads the letter and replies.
// Dear Developer,
//   I can handle this. Tell each field I'm in charge now. I will manage them completely.
//   I have a separate set of rules for each field so they know what to do when they are updated.
//   Also, be sure to tell the form that I'm in charge of submitting now.
//   Here are som props to make that happen, make sure the form knows about them. These are accessible thru "this.props",
//   like this.props.handleSubmit, this.props.fields.title, this.props.fields.categories and this.props.fields.content.
//   {
//     handleSubmit: function,
//     fields: {
//                title: {...},
//                categories: {...},
//                content: {...},
//             }
//   }
// 3. The developer then connects the form elements to the "field configuration object" returned from the Redux Form by using
// the es6 spread syntax {...title}, that destructures/flattens the object into its separate keys and values, and passes it into
// the form input as separate properties.
// So in effect all the properties in these configuration objects becomes properties on the form input element.
//
// The handleSubmit callback function can optionally receive an action creator (from us) as a parameter,
//   so that Redux Form can call the action creator (with the values from the form) when the user submits the form, and the form is valid.
//   We do this by sending in the action creator as the third argument to the "reduxForm" helper method, and then specifying
//   "this.props.createPost" as the argument to the "handleSubmit" callback function.
//
// FORM VALIDATION
// Form validation is another feature that can be handled by Redux Form.
// To do form validation we create a new function (called validate), that will be called by Redux Form whenever the form needs to be validated.
// The validate function is called with the field values from the form as paramaters (values.title, values.categories, values.content).
// Depending on what we return from the function, Redux Form will mark the form as either valid or invalid.
// The validate function's NAME is specified in the configuration object to the reduxForm helper method.
// If all validation is correct, the validate function returns an empty object, {}.
// If there is validation errors, the validate function returns an "error" object.
// The name of the fields that has validation errors is added as a property key to the error object ( errors.title = "Title can not be empty" ).
// If the error object does have some keys attatched to it, the key matctes some of the elements in the "field configuration object", and the value to that key is a trouty string;
//     - Redux Form will NOT submit the form
//     - Redux Form will add some properties to the "field configuration object"
//     - Redux Form will shows the same form again, (does not leave the page / componets we currently see on screen).
// If the object returned from the validate function is an empty object, {};
//     - Redux Form WILL submit the form.
//     - Redux Form will call the action creator received as a parameter to the handleSubmit callback function.
//
// PROGRAMMATICALLY ROUTE TO ANOTHER ROUTE - Using the React Router push helper method
// React Router has a built-in method called "push".
// We can call the push method with a new path, and the router will automatically navigate to that path, and update the url in the adress-bar.
// To get access to the router (that contains the push helper method), we use a property on our component called "context".
// Context in Reacact is a lot like props, it is information from a parent component accessable to a child component.
// The differnce is that the parent component dosen't spesifically have to pass the context to the child.
// The child can by itself make a demand for it.
// NB! Do NOT abuse the use of context. You should really try to avid using it as much as possible.
// The ONLY time we should use context, is specifically when we are working with React Router.
// The reason for this is that the context api is still in flux, and it might change in future releases of React.
// We get access to the context by defining a static contextTypes property,
// giving it a object with a key specifying what peace of context we want to access.
