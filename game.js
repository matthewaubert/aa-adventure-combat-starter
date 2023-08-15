const readline = require('readline');

const { Player } = require('./class/player');
const { World } = require('./class/world');

const worldData = require('./data/world-data');

let player;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printHelp() {
  const messages = [
    "Controls:",
    "  Type 'h' for help",
    "  Type 'q' to quit",
    "  Type 'l' to look around",
    "  Type 'i' to check your inventory",
    "  Type 'take <item>' to take an item",
    "  Type 'drop <item>' to drop an item",
    "  Type 'eat <item>' to eat a food item",
    "  Type 'observe <item>' to observe an item",
    "  Type 'hit <enemy>' to hit an enemy",
    "  Type 'n', 's', 'e', 'w' to move",
    ""
  ];
  messages.forEach(message => console.log(message));
}

function startGame() {
  console.clear();
  console.log("Welcome to App Academy Adventure!\n");

  rl.question('Please enter your name: ', (name) => {
    console.clear();
    console.log(`Hello, ${name}!\n`);

    // Create the world and player
    World.loadWorld(worldData, player);
    player = new Player(name, World.rooms[1]);
    World.setPlayer(player);

    // Show commands
    printHelp();

    rl.question('\nHit RETURN to start your adventure\n', () => {

      console.clear();
      player.currentRoom.printRoom();

      processCommand();
    });

    World.startGame();
  });
}


function processCommand() {

  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      printHelp();

    } else if (cmd === 'q') {
      rl.close();
      process.exit();

    } else if (cmd === 'l') {
      player.currentRoom.printRoom();

    } else if (cmd === 'i') {
      player.printInventory();

    } else if (['n', 's', 'e', 'w'].indexOf(cmd) >= 0) {
      let direction = cmd;
      player.move(direction);

    } else if (cmd.startsWith("take ")) {
      let itemName = cmd.split(" ")[1];

      player.takeItem(itemName);

    } else if (cmd.startsWith("drop ")) {
      let itemName = cmd.split(" ")[1];

      player.dropItem(itemName);

    } else if (cmd.startsWith("eat ")) {
      let itemName = cmd.split(" ")[1];

      player.eatItem(itemName);

    } else if (cmd.startsWith("observe ")) {
      let itemName = cmd.split(" ")[1];

      player.observeItem(itemName);
      
    } else if (cmd.startsWith("hit ")) {
      let enemyName = cmd.split(" ")[1];

      player.hit(enemyName);

    } else {
      console.log("Invalid command. Type 'h' for help.");
    }

    processCommand();
  });
}

startGame();
