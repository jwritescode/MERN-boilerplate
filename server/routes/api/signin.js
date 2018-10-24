const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  //This is the user sign in
app.post('/api/account/signin', (req, res, next) => {
  const { body } = req;
  const {
    password
  } = body;
  let {
    email
  } = body;

  if (!email)  {
    return res.send({
      success: false,
      message: 'Failure: You cannot leave Email blank.'
    });
  }
if (!password) {
  return res.send({
    success: false,
    message: 'Failure: You cannot leave password blank.'
  });
}

email = email.toLowerCase();
email = email.trim();

User.find({
  email: email
}, (err, users) => {
  if (err) {
    console.log('err 2:', err);
    return res.send({
      success: false,
      message: 'Failure: Server confused.'
    });
  }
  if (users.length != 1) {
    return res.send({
      success: false,
      message: 'Failure: Invalid Entry.'
    });
    }

    //Correct user
  const UserSession = new UserSession();
  userSession.userId = user._ud;
  userSession.save((err, doc) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Failure: Server Confused.'
      });
    }

    return res.send({
      success: true,
      message: 'Authorized Login!',
      token: doc._id
    });
  });
});
});

//Logout

app.get('/api/account/logout', (req, res, next) => {
  // get the token
  const { query } = req;
  const { token } = query;
//?token=test

// verify the token is one of a kind and its not deleted.

UserSession.findOneAndUpdate({
  _id: token,
  isDeleted: false
}, {
  $set: {
    isDeleted: true
  }
}, null, (err, sessions) => {
  if (err) {
    console.log(err);
    return res.send({
      success: false,
      message: "Failure: Server Confused."
    });
  }
  return res.send({
    success: true,
    message: 'Good'
  });
});
});
// verify and validate the session token
app.get('/api/account/verify', (req, res, next) => {
  //get the token
  const { query } = req;
  const { token } = query;
  // ?token=test

  //verify the token is one of a kind and not deleted.

  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Failure: Server Confusion'
      });
    }
    if (sessions.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid.'
      });
    } else {
      // do action
      return res.send({
        success: true,
        message: 'Good!'
      });
    }
  });
});

// This is the user sign up //
app.post('/api/account/signup', (req, res, next) => {
  const { body } = req;
  const {
    password
  } = body;
  let {
    email
  } = body;

  if (!email)  {
    return res.send({
      success: false,
      message: 'Failure: You cannot leave Email blank.'
    });
  }
if (!password) {
  return res.send({
    success: false,
    message: 'Failure: You cannot leave password blank.'
  });
}

email = email.toLowerCase();
email = email.trim();

// Steps:
// 1. Verify email doesn't exist
// 2. Save
User.find({
  email: email
}, (err, previousUsers) => {
  if (err) {
    return res.send({
      success: false,
      message: 'Failure: Server is confused.'
    });
  } else if (previousUsers.length > 0) {
    return res.send({
      success: false,
      message: 'Failure: Account was registered using this email previously. Try to log in.'
    });
  }

  // Save the new User
  const newUser = new User();

  newUser.email = email;
  newUser.password = newUser.generateHash(password);
  newUser.save((err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Failure: Server is confused.'
      });
    }
      return res.send({
        success: true,
        message: 'Success! You have registered an account!'
      });
  });
});

}); // end of the sign up endpoint
};
