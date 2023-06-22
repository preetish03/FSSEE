const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const prompt = require('prompt-sync')();

// Connection URL
const url = 'mongodb+srv://preetish03:Chandaji0@cluster0.elqsbee.mongodb.net/?retryWrites=true&w=majority';

// Database Name
const dbName = 'zoos';

// Create a new MongoClient
const client = new MongoClient(url);

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

    async addAnimal() {
        let animal = new Animal();
        if (animal.name === "done") {
            return false;
        }
        this.animals.push(animal);
        await client.db(dbName).collection('animals').insertOne(animal);
        return true;
    }

    async updateAnimal() {
        let name = prompt("Enter the name of the animal to update (or 'done' to finish): ");
        if (name === "done") {
            return false;
        }
        let lifespan = parseInt(prompt("Enter the new lifespan of the animal: "));
        await client.db(dbName).collection('animals').updateOne({name: name}, {$set: {lifespan: lifespan}});
        return true;
    }

    async deleteAnimal() {
        let name = prompt("Enter the name of the animal to delete (or 'done' to finish): ");
        if (name === "done") {
            return false;
        }
        await client.db(dbName).collection('animals').deleteOne({name: name});
        return true;
    }

    async animalsAliveAfterNYears(n) {
        let count = await client.db(dbName).collection('animals').countDocuments({lifespan: {$gte: n}});
        return count;
    }

    async run() {
        let n = parseInt(prompt("Enter the number of years: "));
        while (await this.addAnimal()) {}
        while (await this.updateAnimal()) {}
        while (await this.deleteAnimal()) {}
        console.log(`Number of animals alive after ${n} years: ${await this.animalsAliveAfterNYears(n)}`);
    }
}

async function main() {
    // Use connect method to connect to the Server
    await client.connect();
    let zoo = new Zoo();
    await zoo.run();
    await client.close();
}

main();


