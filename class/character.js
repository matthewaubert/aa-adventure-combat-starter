class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;

    this.items = [];
    this.health = 100;
    this.strength = 10;
  }

  applyDamage(amount) {
    this.health -= amount; // subtract amount from character health
    if (this.health <= 0) this.die(); // if character health <= 0, character dies
  }

  die() {
    this.currentRoom.items.push(...this.items); // place all items in room
    this.items = []; // drop all items
    this.currentRoom = null; // set currentRoom to null
  }

}

module.exports = {
  Character,
};
