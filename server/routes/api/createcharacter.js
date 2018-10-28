const Character = require('../../models/Character');

module.exports = (app) => {
  app.post('/api/account/characters/create', (req, res, next) => {
    const { body } = req;
    const { chName } = body;
    let { chRace } = body;
    let { chClass } = body;

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
