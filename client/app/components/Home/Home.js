import React, { Component } from 'react';
import 'whatwg-fetch';

class Home extends Component {
  constructor(props) {
    super(props);

this.state = {
  isLoading: true,
  token: '',
  signUpError: '',
  signInError: '',
  signInEmail: '',
  signInPassword: '',
  signUpEmail: '',
  signUpPassword: '',
};

this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
this.onSignUp = this.onSignUp.bind(this);
}

//Functions for the sign up/sign in form
componentDidMount() {
  this.setState({
    isLoading: false
  });
}
onSignUp() {
  // Grab setState
  const {
    signUpEmail,
    signUpPassword,
  } = this.state;

  this.setState({
    isLoading: true,
  });
  //Post request to the backend
  fetch('/api/account/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: signUpEmail,
      password: signUpPassword,
    }),
  })
  .then(res => res.json())
  .then(json => {
    console.log('json', json);
    if (json.success) {
      this.setState({
        signUpError: json.message,
        isLoading: false,
        signUpEmail: '',
        signUpPassword: '',
      });
    }
    else {
      this.setState({
        signUpError: json.message,
        isLoading: false,
      });
    }
  });
}
/*In the function above, it grabs the values stored in state. Changes the UI
 to represent loading, and creates a API request to our endpoint.
 When the response comes back, it informs the user what happened.*/

onTextboxChangeSignInEmail(event) {
  this.setStat({
    signInEmail: event.target.value,
  });
}

onTextboxChangeSignInPassword(event) {
  this.setState({
    signInPassword: event.target.value,
  });
}

onTextboxChangeSignUpEmail(event) {
  this.setState({
    signUpEmail: event.target.value,
  });
}

onTextboxChangeSignUpPassword(event) {
  this.setState({
    signUpPassword: event.target.value,
  });
}

render() {
  const {
    isLoading,
    token,
    signInError,
    signInEmail,
    signInPassword,
    signUpEmail,
    signUpPassword,
    signUpError,
  } = this.state;

  if (isLoading) {
    return (<div><p>Loading...</p></div>);
  }

  if (!token) {
    return (
      <div>
        <div>
          {
            (signInError) ? (
              <p>{signInError}</p>
            ) : (null)
          }
          <p>Sign In</p>
          <input
            type="password"
            placeholder="Password"
            value={signInPassword}
            onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button>Sign In</button>
            </div>
            <br />
            <br />
            <div>
              {
                (signUpError) ? (
                  <p>{signUpError}</p>
                ) : (null)
              }
              <p>Sign Up</p>
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={this.onTextboxChangeSignUpEmail}
                /><br />
                <input
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={onTextboxChangeSignUpPassword}
                  /><br />
                  <button onClick={this.onSignUp}Sign Up</button>
                  </div>


                  </div>
                );
  }

  return (
    <div>
    <p>Signed in<p>
    </div>
  );
}

export default Home;
