const EventEmitter = require("events");

class Element extends EventEmitter {
    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data) {
        const event = {
            type: type,
            target: this,
            currentTarget: this,
            data: data,
            stopped: false,
            stopPropagation() {
                this.stopped = true;
            }
        };

        let element = this;

        while (element) {
            event.currentTarget = element;
            element.emit(type, event);

            if (event.stopped) {
                break;
            }

            element = element.parent;
        }
    }
}

const documentElement = new Element("document");
const form = new Element("form", documentElement);
const button = new Element("button", form);

function buttonHandler(event) {
    console.log(`Button: target=${event.target.name}, currentTarget=${event.currentTarget.name}`);
}

function formHandler(event) {
    console.log(`Form: target=${event.target.name}, currentTarget=${event.currentTarget.name}`);
}

function documentHandler(event) {
    console.log(`Document: target=${event.target.name}, currentTarget=${event.currentTarget.name}`);
}

button.addEventListener("click", buttonHandler);
form.addEventListener("click", formHandler);
documentElement.addEventListener("click", documentHandler);

console.log("Scenario A");
button.dispatchEvent("click", "Button clicked");

console.log("Scenario B");
form.removeEventListener("click", formHandler);

form.addEventListener("click", (event) => {
    console.log(`Form: target=${event.target.name}, currentTarget=${event.currentTarget.name}`);
    event.stopPropagation();
});

button.dispatchEvent("click", "Button clicked");

console.log("Scenario C");
button.removeEventListener("click", buttonHandler);

button.dispatchEvent("click", "Button clicked");

form.addEventListener("keypress", (event) => {
    console.log(`Keypress: target=${event.target.name}, currentTarget=${event.currentTarget.name}`);
});

form.dispatchEvent("keypress", "Enter");