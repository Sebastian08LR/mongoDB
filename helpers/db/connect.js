// const { MongoClient } = require('mongodb');
// connect.js
import {MongoClient} from 'mongodb';

export class connect {
    static instance;
    user;
    port;
    cluster;
    #host;
    #pass
    #dbName
    constructor({host, user, pass, port,cluster, dbName}=
        {host: "mongodb+srv://", 
            user: "Sebastian08LR", 
            pass: "Qv3lLtAo4sfGnSE9", 
            port: 47797, 
            cluster: "cluster0.u2p3js9.mongodb.net/", 
            dbName: "m2"}
        ) {
        if (typeof connect.instance === 'object') {
            return connect.instance;
        }
        this.setHost = host;
        this.user = user;
        this.setPass = pass;
        this.port = port;
        this.cluster = cluster;
        this.setDbName = dbName;
        this.#open()
        connect.instance = this;
        return this;
    }
    set setHost(host){
        this.#host = host;
    }
    set setPass(pass){
        this.#pass = pass;
    }
    set setDbName(dbName){
        this.#dbName = dbName;
    }
    get getDbName(){
        return this.#dbName;
    }
    async #open() {
        console.log("CONNECTION ATTEMPTING...");

        let url = `${this.#host}${this.user}:${this.#pass}@${this.cluster}:${this.port}`;
        this.conexion = new MongoClient(url);

        const loadingMessage = "ACCEDING TO THE NETWORK";
        let messageIndex = 0;

        function updateLoadingMessage() {
            process.stdout.write(`\r${loadingMessage.substring(0, messageIndex)}`);
            messageIndex++;
        }

        function completeLoadingAnimation() {
            return new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    if (messageIndex > loadingMessage.length) {
                        clearInterval(intervalId);
                        resolve();
                    } else {
                        updateLoadingMessage();
                    }
                }, 20);
            });
        }

        // Iniciar la animación de carga
        await completeLoadingAnimation();

        try {
            await this.conexion.connect();
            console.log("\n██████████████████████████ Connection successful!");
            console.log("hackeado completo");
        } catch (error) {
            console.error("Connection failed:", error);
        }
    }

    async #connect() {
        return await this.conexion.db(this.#dbName);
    }
}



/* const uri = "mongodb+srv://Sebastian08LR:Qv3lLtAo4sfGnSE9@cluster0.u2p3js9.mongodb.net/m2?retryWrites=true&w=majority";

 export async function connect() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Conectar al cliente
        await client.connect();

        // Confirmar la conexión
        console.log("Conectado a MongoDB Atlas");

        // Realizar operaciones en la base de datos aquí
        
        const database = client.db('m2');
        const collection = database.collection('movie');
        const query = {
            "format": {
                $elemMatch: {
                    "name": "Bluray",
                    "copies": { $lt: 500 }
                }
            }
        };

        const movies = await collection.find(query).toArray();

        // Imprime los resultados
        console.log("Películas encontradas:");
        movies.forEach(movie => {
            console.log(JSON.stringify(movie, null, 2));
        });
    } catch (e) {
        console.error(e);
    } finally {
        // Cerrar la conexión
        await client.close();
    }
}

connect().catch(console.error);
 */