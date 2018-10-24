const User = require('../../models/User');

module.exports = (app) => {
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
      return res.send({
        success: true,
        message: 'Succes! You have registered an account!'
      });
  });
});

}); // end of the sign up endpoint
};
