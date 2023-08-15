module.exports = {
  rooms: [
    {
      id: 1,
      name: "Crossroad",
      description: "You are standing at a crossroad. To the north, east, south and west you see empty space, waiting to be filled.",
      exits: {n: 2, e: 3, w: 4, s: 5}
    },
    {
      id: 2,
      name: "Northern point",
      description: "You are standing at the north point of a crossroad. To the south, you see an empty intersection.",
      exits: {s: 1}
    },
    {
      id: 3,
      name: "Eastern point",
      description: "You are standing at the east point of a crossroad. To the west, you see an empty intersection.",
      exits: {w: 1}
    },
    {
      id: 4,
      name: "Western point",
      description: "You are standing at the west point of a crossroad. To the east, you see an empty intersection.",
      exits: {e: 1}
    },
    {
      id: 5,
      name: "Southern point",
      description: "You are standing at the south point of a crossroad. To the north, you see an empty intersection.",
      exits: {n: 1}
    },
    {
      id: 2.1,
      name: "Castle Gate",
      description: "You are standing at the entrance of a castle. To the north, you see an open gate. To the south, you see the northern point of a crossroad.",
      exits: {n: 2.2, s: 2}
    },
    {
      id: 2.2,
      name: "Castle Gatehouse",
      description: "You are standing in the castle gatehouse. To the south, you see an open gate.",
      exits: {s: 2.1}
    }
  ],
  items: [
    {
      name: "rock",
      description: "Just a simple rock",
      room: 1
    },
    {
      name: "sandwich",
      description: "A tasty looking sandwich",
      room: 2,
      isFood: true,
      effect: "Your taste buds explode with flavor and your hunger subsides."
    },
    {
      name: "mushrooms",
      description: "These mushrooms have a strange magical aura about them...",
      room: 5,
      isFood: true,
      effect: "The world around you begins to shimmer and change into shifting patterns. Your mind is temporarily taken to another plane of existence..."
    },
    {
      name: "sword",
      description: "This sword isn't fancy, but looks capable of doing some damage...",
      room: 4
    },
    {
      name: "shield",
      description: "A wooden shield bearing the royal crest of the kingdom",
      room: 2.2
    }
  ],
  enemies: [
    {
      name: "goblin",
      description: "A mean-looking goblin",
      room: 3
    },
  ]
}
