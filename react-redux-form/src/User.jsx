import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import './App.css';
import './user.css';

let UserForm = props => {
  const { handleSubmit } = props;
  return <form onSubmit={handleSubmit} className="form">
    <div className="field">
      <div className="control">
        <Field name="firstName" component={renderField} type="text" label="First Name"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <Field name="lastName" component={renderField} type="text" label="Last Name"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <Field name="email" component={renderField} type="email" label="Email Address"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <Field name="age" component={renderField} type="number" label="Age"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <label className="label">Proficiency</label>
        <div className="select">
          <Field className="input" name="proficiency" component="select">
            <option />
            <option value="beginner">Beginner Dev</option>
            <option value="intermediate">Intermediate Dev</option>
            <option value="expert">Expert Dev</option>
          </Field>
        </div>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <label className="label">Gender</label>
        <label className="radio">
          <Field name="gender" component="input" type="radio" value="male" />
          {' '}
          Male
        </label>
        <label className="radio">
          <Field name="gender" component="input" type="radio" value="female" />
          {' '}
          Female
        </label>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <label className="checkbox">
          <Field name="saveDetails" id="saveDetails" component="input" type="checkbox"/>
          Save Details
        </label>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <label className="label">Message</label>
        <Field className="textarea" name="message" component="textarea" />
      </div>
    </div>

    <div className="field">
      <div className="control">
        <button className="button is-link">Submit</button>
      </div>
    </div>

  </form>;
};

const validate = val => {
  const errors = {};
  if (!val.firstName) {
    // console.log('First Name is required');
    errors.firstName = 'First Name is Required';
  }
  if (!val.lastName) {
    // console.log('Last Name is required');
    errors.lastName = 'Last Name is Required';
  }
  if (!val.email) {
    // console.log('email is required');
    errors.email = 'Email is Required';
  } else if (!/^.+@.+$/i.test(val.email)) {
    // console.log('email is invalid');
    errors.email = 'Invalid email address';
  }
  if (!val.age) {
    errors.age = 'Age is Required'
  } else if (isNaN(Number(val.age))) {
    errors.age = 'Age must be a number'
  } else if (Number(val.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className="control">
      <label className="field">{label}</label>
      <input className="input" {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className='input-error'>{error}</span>) || (warning && <span className='input-warning'>{warning}</span>))}
    </div>
  </div>
)

UserForm = reduxForm({
  form: 'userForm',
  validate,
})(UserForm);

class User extends Component {
  constructor(){
      super()
      this.state={
          userSaved:null
      }
      this.handleRegister = this.handleRegister.bind(this)
  }
  handleRegister =async values => {
    this.setState({userSaved:'User has been saved successfully'})
    console.log(values);
    try{
    const res = await fetch('http://localhost:4210/user/add',{
            method: 'POST',
            body: JSON.stringify(values),
            headers:{
              'content-type':'application/json'
            }
        })
        console.log('Processed')
        const data = await res.json()
        console.log('Completed ',res)
      }catch(error){
            console.log('Error ',error)
      }
  };

  render() {
    return (
      <div className="App">
          <h1 className="App-title">User Registration</h1>
        <div className="container">
          <UserForm onSubmit={this.handleRegister} />
          <span className='register-success'>
            {this.state.userSaved}
          </span>
        </div>
      </div>
    );
  }
}

export default User;
