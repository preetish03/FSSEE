const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

// Connect to MongoDB
mongoose.connect('mongodb+srv://preetish03:Chandaji0@cluster0.elqsbee.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the Animal schema
const animalSchema = new mongoose.Schema({
    name: String,
    lifespan: Number
});

// Create the Animal model
const Animal = mongoose.model('Animal', animalSchema);

class Zoo {
    constructor() {
        this.animals = [];
    }

    async addAnimal() {
        let name = prompt("Enter the name of the animal (or 'done' to finish): ");
        if (name === "done") {
            return false;
        }
        let lifespan = parseInt(prompt("Enter the lifespan of the animal: "));
        let animal = new Animal({ name, lifespan });
        await animal.save();
        this.animals.push(animal);
        return true;
    }

    async updateAnimal() {
        let name = prompt("Enter the name of the animal to update (or 'done' to finish): ");
        if (name === "done") {
            return false;
        }
        let lifespan = parseInt(prompt("Enter the new lifespan of the animal: "));
        await Animal.updateOne({ name }, { lifespan });
        return true;
    }

    async deleteAnimal() {
        let name = prompt("Enter the name of the animal to delete (or 'done' to finish): ");
        if (name === "done") {
            return false;
        }
        await Animal.deleteOne({ name });
        return true;
    }

    async animalsAliveAfterNYears(n) {
        let count = await Animal.countDocuments({ lifespan: { $gte: n } });
        return count;
    }

    async run() {
        let n = parseInt(prompt("Enter the number of years: "));
        while (await this.addAnimal()) {}
        while (await this.updateAnimal()) {}
        while (await this.deleteAnimal()) {}
        let count = await this.animalsAliveAfterNYears(n);
        console.log(`Number of animals alive after ${n} years: ${count}`);
    }
}

async function main() {
    let zoo = new Zoo();
    await zoo.run();
    mongoose.connection.close();
}

main();






