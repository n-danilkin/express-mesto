const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', (req, res) => fs.readFile(cardsPath)
  .then((cards) => {
    res
      .status(200)
      .send(JSON.parse(cards));
  })
  .catch((error) => {
    res
      .status(500)
      .send({ message: error });
  }));

module.exports = router;
