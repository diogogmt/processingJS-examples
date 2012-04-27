require(
  [
    "./stack/stack",
    "./queue/queue",
    "./cyclic-queue/cyclic-queue",
  ],
  function () {

    // Init Stack
    console.log("stack main.js");
    var Stack = require("./stack/stack");
    var stack = new Stack();
    stack.init();


    // Init Queue
    // TODO add front and rear reference to the animation
    console.log("queue main.js");
    var Queue = require("./queue/queue");
    var queue = new Queue();
    queue.init();

    // Init CyclicQueue
    console.log("cyclic-queue main.js");
    var CyclicQueue = require("./cyclic-queue/cyclic-queue");
    var cyclicQueue = new CyclicQueue();
    cyclicQueue.init();
});
