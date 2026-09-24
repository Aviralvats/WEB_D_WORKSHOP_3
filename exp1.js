const EventEmitter = require("events");

const session = new EventEmitter();

session.on("greet", (username) => {
    console.log(`Hello, ${username}! Welcome.`);
});

session.on("exit", (code) => {
    console.log(`Session closed with code ${code}. Goodbye!`);
});

session.once("greet", () => {
    console.log("First login of the day!");
});

session.on("error", (message) => {
    console.log(`Error: ${message}`);
});

function trigger(command, ...args) {
    if (command === "greet" || command === "exit") {
        session.emit(command, ...args);
    } else {
        console.log(`Unknown event: ${command}`);
    }
}

session.emit("greet", "Aviral");
session.emit("greet", "Rahul");
session.emit("greet", "Priya");

console.log("Greet listener count:", session.listenerCount("greet"));

session.emit("exit", 0);

trigger("login");

session.emit("error", "Something went wrong!");