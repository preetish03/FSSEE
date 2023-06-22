const prompt = require('prompt-sync')();

class Animal {
    constructor() {
        this.name = prompt("Enter the name of the animal (or 'done' to finish): ");
        if (this.name === "done") {
            return;
        }
        this.lifespan = parseInt(prompt("Enter the lifespan of the animal: "));
    }
}

class Zoo {
    constructor() {
        this.animals = [];
    }

    addAnimal() {
        let animal = new Animal();
        if (animal.name === "done") {
            return false;
        }
        this.animals.push(animal);
        return true;
    }

    animalsAliveAfterNYears(n) {
        let count = 0;
        for (let animal of this.animals) {
            if (animal.lifespan >= n) {
                count++;
            }
        }
        return count;
    }

    run() {
        let n = parseInt(prompt("Enter the number of years: "));
        while (this.addAnimal()) {}
        console.log(`Number of animals alive after ${n} years: ${this.animalsAliveAfterNYears(n)}`);
    }
}

function main() {
    let zoo = new Zoo();
    zoo.run();
}

main();



