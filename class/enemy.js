const { Character } = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000; // cooldown attribute defaults to 3000ms
    this.attackTarget = null; // attack target
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    const exits = this.currentRoom.getExits(); // get available exits from current room
    const direction = exits[this.#getRandomNumber(exits.length)]; // randomly select direction
    const nextRoom = this.currentRoom.getRoomInDirection(direction); // select next room
    this.currentRoom = nextRoom; // move Enemy to exit

    this.cooldown += 3000; // reset cooldown to 3 seconds
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown.bind(this), this.cooldown);
  }

  attack() {
    this.cooldown += 3000; // increment cooldown
    if (this.attackTarget === null) return; // if attackTarget is null, return
    // apply strength amount of damage to player
    this.player.applyDamage(this.strength);
    // tell player they've been attacked
    console.log(`The ${this.name} attacks you, dealing ${this.strength} damage!`);
  }

  applyDamage(amount) {
    this.health -= amount; // subtract amount from character health
    this.attackTarget = this.player; // change attackTarget to player
    if (this.health <= 0) this.die(); // if character health <= 0, character dies
  }

  // method "randomAction"
  randomAction() {
    // array of action methods: scratchNose, attack, move
    const actions = [this.scratchNose.bind(this), this.attack.bind(this), this.randomMove.bind(this)];
    // select random number within range of indices of action methods
    const index = this.#getRandomNumber(actions.length);
    return actions[index]; // return action method at random index
  }

  // private method "getRandomNumber"; input: num
  #getRandomNumber(num) {
    return Math.floor(Math.random() * num);
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      const action = this.randomAction(); // get random action
      action(); // implement action
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 3000;

    this.alert(`The ${this.name} scratches its nose`);
  }


}

module.exports = {
  Enemy,
};
