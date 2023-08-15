const { Character } = require('./character');
const { Enemy } = require('./enemy');
const { Food } = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // splice item from room.items array
    const index = this.currentRoom.items.findIndex(item => item.name === itemName);
    if (index === -1) { // edge case: item not found in room
      console.log(`There is no ${itemName} here...`);
      return;
    }
    const item = this.currentRoom.items.splice(index, 1);
    this.items.push(...item); // push this item to this player.items array
    console.log(`You take the ${itemName} and place it in your inventory.`);
  }

  dropItem(itemName) {
    // splice item from player.items array
    const index = this.items.findIndex(item => item.name === itemName);
    if (index === -1) { // edge case: item not found in inventory
      console.log(`There is no ${itemName} in your inventory...`);
      return;
    }
    const item = this.items.splice(index, 1);
    this.currentRoom.items.push(...item); // push this item to room.items array
    console.log(`You take the ${itemName} from your inventory and drop it.`);
  }

  eatItem(itemName) {
    const item = this.getItemByName(itemName); // get item by name
    const index = this.items.findIndex(item => item.name === itemName);
    if (index === -1) { // edge case: item not found in inventory
      console.log(`There is no ${itemName} in your inventory...`);
      return;
    }
    if (item.isFood) { // if item is food
      // splice item from player.items array
      this.items.splice(index, 1);
      console.log(`You eat the ${item.name}.`);
      console.log(item.effect);
    } else {
      console.log(`You can't eat the ${item.name} because it's not food.`);
    }
  }

  getItemByName(name) {
    // iterate through player items to find item.name equal to name
    return this.items.find(item => item.name === name);
  }

  observeItem(itemName) {
    const item = this.getItemByName(itemName); // get item by name from inventory
    if (item === undefined) { // edge case: item doesn't exist in inventory
      console.log(`There is no ${itemName} in your inventory.`);
      return;
    }
    console.log(item.description); // console log item's description
}

  hit(name) {
    const target = this.currentRoom.getEnemyByName(name); // find target
    if (target === undefined) { // if target doesn't exist, tell player
      console.log(`There is no ${name} here...`);
      return;
    }
    // tell player they've been attacked
    console.log(`You hit the ${name}, dealing ${this.strength} damage!`);
    // apply strength amount of damage to target
    target.applyDamage(this.strength);
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};



/****************************** TESTS ******************************/
// const { Item } = require("./item");
// const { Room } = require("./room");
// const { Food } = require("./food");

// let item = new Item("rock", "just a simple rock");
// let room = new Room("Test Room", "A test room");
// let player = new Player("player", room);

// room.items.push(item);
// console.log(room.items.length); // 1
// console.log(player.items.length); // 0

// player.takeItem("rock");
// console.log(room.items.length); // 0
// console.log(player.items.length); // 1

// console.log(player.getItemByName("rock")); // rock item


// let food = new Food("sandwich", "a delicious sandwich");
// let room = new Room("Test Room", "A test room");
// let player = new Player("player", room);

// player.items.push(food);

// console.log(player.items.length); // 1

// player.eatItem("sandwich");

// console.log(player.items.length); // 0