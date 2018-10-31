const Character = require('../../models/Character');
const User = require('../../models/User');

module.exports = (app) => {
  app.post('/api/account/characters/create', (req, res, next) => {
    const { body } = req;
    const { chName } = body;
    let { chRace } = body;
    let { chClass } = body;
    let { chUserID } = body;

  if (!chName) {
    return res.send({
      success: false,
      message: 'Error: character name cannot be blank.'
    });
  }
  if (!chRace) {
    return res.send({
      success: false,
      message: 'Error: character race cannot be blank.'
    });
  }
  if (!chClass) {
    return res.send({
      success: false,
      message: 'Error: character class cannot be blank.'
    });
  }
  if (!chUserID) {
    return res.send({
      success: false,
      message: 'Error: until I figure out how, you must manually input your user name.'
    });

  }

  

  User.find({
    chUserID: chUserID
  }, (err, validUser) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: server error.'
      });
    }
      else if (validUser.length != 1) {
        return res.send({
          success: false,
          message: 'Not a valid user.'
        });
      }
    
  
  })


  // verify its not a used name

  Character.find({
    chName: chName
  }, (err, previousCharacters) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error.'
      });
    } else if (previousCharacters.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Character name is taken.'
      });
    }
// save the new Character
    const newCharacter = new Character();

    newCharacter.chName = chName;
    newCharacter.chRace = chRace;
    newCharacter.chClass = chClass;
    newCharacter.chUserID = chUserID;
    newCharacter.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }
      return res.send({
        success: true,
        message: 'Character Created!'
      });
    });
  });
});
}
