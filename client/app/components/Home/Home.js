import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  setInStorage,
  getFromStorage,
} from '../../utils/storage';

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
this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

this.onSignUp = this.onSignUp.bind(this);
this.onSignIn = this.onSignIn.bind(this);
this.logout = this.logout.bind(this);
}

//Functions for the sign up/sign in form
componentDidMount() {
  const obj = getFromStorage('the_main_app');
  if (obj && obj.token) {
    const { token } = obj;
    //verify token
    fetch('/api/account/verify?token=' + token)
    .then(res => res.json())
    .then(json => {
      if (json.success) {
      this.setState({
        token,
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: false,
  });
}
});
} else {
  this.setState({
    isLoading: false,
  });
}
}
logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
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
onSignIn() {
  // Grab state
  const {
    signInEmail,
    signInPassword,
  } = this.state;

  this.setState({
    isLoading: true,
  });

  // post request to backend
  fetch('/api/account/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: signInEmail,
      password: signInPassword,
    }),
  })
  .then(res => res.json())
  .then(json => {
    console.log('json', json);
    if (json.success) {
      setInStorage('the_main_app', { token: json.token });
      this.setState({
        signInError: json.message,
        isLoading: false,
        signInPassword: '',
        signInEmail: '',
        token: json.token,
      });
    } else {
      this.setState({
        signInError: json.message,
        isLoading: false,
      });
    }
  });
}


onTextboxChangeSignInEmail(event) {
  this.setState({
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
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={this.onTextboxChangeSignInEmail}
              />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={signInPassword}
            onChange={this.onTextboxChangeSignInPassword}
          />
          <br />
          <button onClick={this.onSignIn}>Sign In</button>
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
            onChange={this.onTextboxChangeSignUpPassword}
          /><br />
          <button onClick={this.onSignUp}>Sign Up</button>
        </div>
     </div>
    );
  }
  return (
    <div>
      <p>Account</p>
      <button onClick={this.logout}>Logout</button>
    </div>
  );
}
}

export default Home;
