import dateFNs from 'date-fns'
import React, { Component } from 'react';
import logo from './logo.svg';
import { withFormik } from 'formik'
import './App.css';
var styles = {
  error: {
    color: 'tomato'
  }
};
class InnerForm extends Component {
  render() {
    const { values, errors, touched, handleChange, handleSubmit, isSubmitting, handleBlur, handleReset } = this.props;
    return( 
      <div>
        {JSON.stringify(values)}
        {JSON.stringify(errors)}
        {JSON.stringify(touched)}
        <button onClick={handleReset}>Reset</button>
        {touched.username && errors.username && <p style={styles.error}>{errors.username}</p>}
        <form
          onSubmit={handleSubmit}
          >
        <input
          name="username"
          type="text"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          />
          <button
            type="submit"
            >Submit</button>
            </form>
          {isSubmitting && <span>Submitting</span>}

      </div>
    )

  }
}
const MyForm  = withFormik({
  mapPropsToValues: props => ({username: ''}),
  validate: (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = 'Required'
    }
    return errors;
  },
  handleSubmit(values, rest) {

    console.log({ values, rest })
  }
})(InnerForm)

let now = new Date()
console.log(now)
let later = dateFNs.addDays(now, 1)
console.log({ now, later })


class App extends Component {
  state = {
    date: now
  }
  render() {
    return (
      <div className="App">
        {dateFNs.format(this.state.date)}
        <button 
          onClick={() => {
            this.setState({
              date: dateFNs.addDays(this.state.date, 1)
            })
          }}
          >Add</button>

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <MyForm />
      </div>
    );
  }
}

export default App;
