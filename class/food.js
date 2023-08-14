const { Item } = require('./item');

class Food extends Item {

  constructor(name, description, effect) {
    super(name, description);
    this.effect = effect;
    this.isFood = true;
  }
}

module.exports = {
  Food,
};
