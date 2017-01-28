import React, { Component, PropTypes } from 'react';     // PropTypes gives us access to the component's application context.
import { reduxForm, Field } from 'redux-form';           // Import the eduxForm helper method, nearly identical to the connect helper function from the react-redux library.
import { createPost } from '../actions/index';           // Import the createPosts action creator.
import { Link } from 'react-router';                     // Import the Link component from React Router.
import { connect } from 'react-redux';                   // Import the connect helper from react-redux.

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

   onSubmit(values) { // The values parameter is properties from the form, the title, categories, and content.
      // The createPost action creator is returning a promise. We can chain on to that promise with the ".then" callback function.
      this.props.createPost(values)
      .then(() => {
         // Blog post has been created, navigate the user to the index.
         // We navigate by calling this.context.router.push helper method, with the new path to navigate to.
         this.context.router.push('/');
      });
   }

   render() {
      const { handleSubmit } = this.props;
      return(
         <form onSubmit={ handleSubmit(this.onSubmit.bind(this))} className="form-horizontal">
            <h3>Create a new blog post</h3>
            <Field name="title" type="text" component={renderField} label="Title"/>
            <Field name="categories" type="text" component={renderField} label="Categories"/>
            <Field name="content" type="text" component={renderField} label="Content"/>
            <button type="submit" className="btn btn-primary">Save</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
         </form>
      );
   }
}

// Helper function to render one single field.
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="form-group">
    <label className="control-label col-sm-2" htmlFor={name}>{label}</label>
    <div className="col-sm-10">
      <input {...input} placeholder={label} id={name} type={type} className={`form-control ${touched && error ? 'panel-danger' : ''}`}/>
      <div className="text-danger">
         { touched ? error : "" }
      </div>
    </div>
  </div>
)

// validate is called with the values from the fields of the form.
function validate(values) {
   const errors = {};

   if ( !values.title ) {
      errors.title = 'Please supply a title for your blog post';
   }

   if ( !values.categories ) {
      errors.categories = "Please supply at least one category for the blog post";
   }

   if ( !values.content ) {
      errors.content = "Please supply a content for the blog post"
   }

   return errors;
}

// Decorate the PostsNew Component with reduxForm.
PostsNew = reduxForm({
   form: 'PostsNewForm',
   validate
})(PostsNew);

// Decorate the PostsNew Component with redux connect, to make it possible to call the createPost action creator.
PostsNew = connect(null, {createPost})(PostsNew);

// Export the docorated and connected version of PostsNew.
export default PostsNew;

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
