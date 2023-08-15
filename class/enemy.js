const { Character } = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000; // cooldown attribute defaults to 3000ms
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    const exits = this.currentRoom.getExits(); // get available exits from current room
    const direction = exits[Math.floor(Math.random() * exits.length)]; // randomly select direction
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
    // Fill this in
  }

  // applyDamage(amount) {
  //   // Fill this in
  // }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 3000;

    this.alert(`${this.name} scratches its nose`);
  }


}

module.exports = {
  Enemy,
};
