// movie.js

import { ObjectId } from "mongodb";
import { connect } from "../../helpers/db/connect.js"


export class movie extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof movie.instance === 'object') {
            return movie.instance;
        }
        movie.instance = this;
        return this;
    }
    async totalDvdValue(){
        const collection = this.db.collection('movie');
        const totalDvdValue = await collection.aggregate([
            { $unwind: "$format" },
            { $match: { "format.name": "dvd" } },
            { $group: { _id: null, totalValue: { $sum: { $multiply: ["$format.copies", "$format.value"] } } } }
            ]).toArray();
            
        await this.conexion.close();
        return {countByMoviDVD: totalDvdValue};
    }

    async distinctGenres(){
        const collection = this.db.collection('movie');
        const distinctGenres = await collection.distinct("genre");
        await this.conexion.close();
        return {distinctGenres: distinctGenres};
    }

    async moviesWithActor1(){
        const collection = this.db.collection('movie');
        const moviesWithActor1 = await collection.find({ "character.id_actor": 1 }).toArray();
        await this.conexion.close();
        return {moviesWithActor1: moviesWithActor1}
    }

    async moviesWithJohnDoe(){
        const collection = this.db.collection('movie');
        const moviesWithJohnDoe = await collection.find({ "character.id_actor": 1 }).toArray();
        await this.conexion.close();
        return {moviesWithJohnDoe: moviesWithJohnDoe}
    }
    async moviesWithPrincipalActors(){
        const collection = this.db.collection('movie');
        const moviesWithPrincipalActors = await collection.find({ "character.rol": "principal" }).toArray();
        await this.conexion.close();
        return {moviesWithPrincipalActors: moviesWithPrincipalActors}
    }

    async moviesWithJohnDoeAndBluray(){
        const collection = this.db.collection('movie');
        const moviesWithJohnDoeAndBluray = await collection.find({
            "character.id_actor": 1,
            "format.name": "Bluray"
            }).toArray();
        await this.conexion.close();
        return {moviesWithJohnDoeAndBluray: moviesWithJohnDoeAndBluray}
    }

    async sciFiMoviesWithActor3(){
        const collection = this.db.collection('movie');
        const sciFiMoviesWithActor3 = await collection.find({
            genre: "Ciencia Ficción",
            "character.id_actor": 3
            }).toArray();
        await this.conexion.close();
        return {sciFiMoviesWithActor3: sciFiMoviesWithActor3}
    }
    async totalBlurayValue() {
        const collection = this.db.collection('movie');
        const result = await collection.aggregate([
            { $unwind: "$format" },
            { $match: { "format.name": "Bluray" } },
            { $group: { _id: null, totalValue: { $sum: { $multiply: ["$format.copies", "$format.value"] } } } }
        ]).toArray();
        await this.conexion.close();
        return {totalBlurayValue: (result.length > 0 ? result[0].totalValue : 0)}
    }
    async moviesWithActor2(){
        const collection = this.db.collection('movie');
        const moviesWithActor2 = await collection.find({ "character.id_actor": 2 }).toArray();
        await this.conexion.close();
        return {moviesWithActor2}

    }
}