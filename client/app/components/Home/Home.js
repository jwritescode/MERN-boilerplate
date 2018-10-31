import React, { Component } from 'react';
import 'whatwg-fetch';
// import FlexView from 'react-flexview';
import '../../styles/styles.scss';

import {
  getFromStorage,
  setInStorage,
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
      chNameCreate: '',
      chRaceCreate: '',
      chClassCreate: '',
      chCreateError: '',
      chUserID: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);

    this.onTextboxChangeCharacterName = this.onTextboxChangeCharacterName.bind(this);
    this.onTextboxChangeCharacterRace = this.onTextboxChangeCharacterRace.bind(this);
    this.onTextboxChangeCharacterClass = this.onTextboxChangeCharacterClass.bind(this);


    this.onCharacterCreate = this.onCharacterCreate.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
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

  onTextboxChangeCharacterName(event) {
    this.setState({
      chNameCreate: event.target.value,
    });
  }
  onTextboxChangeCharacterRace(event) {
    this.setState({
      chRaceCreate: event.target.value,
    });
  }
  onTextboxChangeCharacterClass(event) {
    this.setState({
      chClassCreate: event.target.value,
    });
  }


  onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
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
              isLoading: false
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

  //Character chCreation

  onCharacterCreate() {
    // Grab state
    const {
      chNameCreate,
      chRaceCreate,
      chClassCreate,
    } = this.state;
    const chUserID = function (req, res, next) {
      req.UserSession.userID;
    }
    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/characters/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chName: chNameCreate,
        chRace: chRaceCreate,
        chClass: chClassCreate,
        chUserID: chUserID,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            chCreateError: json.message,
            isLoading: false,
            chNameCreate: '',
            chRaceCreate: '',
            chClassCreate: '',
            chUserID: '',
          });
        } else {
          this.setState({
            chCreateError: json.message,
            isLoading: false,
          });
        }
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
      chNameCreate,
      chRaceCreate,
      chClassCreate,
      chCreateError,
      

    } = this.state;
    const chUserID = function (req, res, next) {
      req.UserSession.userID;
    }
    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div class="signin-signup-page-container">
          <div class="signin-container">
        {
          (signInError) ? (
            <p class="signin-error">{signInError}</p>
          ) : (null)
        }
        <p class="signin-header-text">Sign In</p>
        <input class="signin-email-input"
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
        />
        <br />
        <input class="signin-password-input"
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
        />
            <br />
            <button class="signin-button" onClick={this.onSignIn}>Sign In</button>
          </div>
          <br />
          <br />
          <div class="signup-container">
          {
              (signUpError) ? (
                <p class="signup-error">{signUpError}</p>
              ) : (null)
            }
            <p class="signup-header-text">Sign Up</p>
            <input class="signup-email-input"
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /><br />
            <input class="signup-password-input"
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <button class="signup-button" onClick={this.onSignUp}>Sign Up</button>
          </div>
       </div>




   /*     <FlexView hAlignContent='center' vAlignContent='center'>
          <FlexView column='true' hAlignContent='center'  style={{ color: '#FFFFFF', backgroundColor: '#D1236D' }}>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }

            <FlexView>Log In</FlexView><br />
          <FlexView><input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            /></FlexView>

            <FlexView><input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            /></FlexView>
<br />
            <FlexView><button onClick={this.onSignIn}>Sign In</button></FlexView>

         </FlexView>
         <FlexView hAlignContent='center'>
         <FlexView>&nbsp;&nbsp;Welcome to johnwritescode!&nbsp;&nbsp;</FlexView>
       </FlexView>
          <FlexView column='true' hAlignContent='center' style={{ color: '#FFFFFF', backgroundColor: '#1A91EB' }}>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <FlexView>Register</FlexView><br />
            <FlexView><input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /></FlexView>
            <FlexView><input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /></FlexView><br />
            <FlexView><button onClick={this.onSignUp}>Sign Up</button></FlexView>
          </FlexView>
</FlexView> */




      );
    }

    return (
      <div class="account-page-container">
        <div class="account-page-nav-container">
        <p class="account-heading">Account</p>
        <button class="logout-button" onClick={this.logout}>Logout</button>
          <div class="character-create-container">
            {
              (chCreateError) ? (
                <p class="character-create-error">{chCreateError}</p>
              ) : (null)
            }
            <p class="character-create-header-text">Create Character</p>
            <input class="character-create-name-input"
              type="chName"
              placeholder="Character Name"
              value={chNameCreate}
              onChange={this.onTextboxChangeCharacterName}
            />
            <br />
            <input class="character-create-race-input"
              type="chRace"
              placeholder="Character Race"
              value={chRaceCreate}
              onChange={this.onTextboxChangeCharacterRace}
            />
            <br />
            <input class="character-create-class-input"
              type="chClass"
              placeholder="Character Class"
              value={chClassCreate}
              onChange={this.onTextboxChangeCharacterClass}
            />
            <br />
            <button class="character-create-button" onClick={this.onCharacterCreate}>Create</button>
          </div>
          </div>
          </div>

    );
  }
}

export default Home;
