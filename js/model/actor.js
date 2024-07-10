
import { ObjectId } from "mongodb";
import { connect } from "../../helpers/db/connect.js"


export class Actor extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof Actor.instance === 'object') {
            return Actor.instance;
        }
        Actor.instance = this;
        return this;
    }

    async totalAwards(){
        const collection = this.db.collection('actor');
        const totalAwards = await collection.aggregate([
            { $unwind: "$awards" },
            { $group: { _id: "$full_name", totalAwards: { $sum: 1 } } }
            ]).toArray();
        await this.conexion.close();
        return {totalAwards: totalAwards};
    }

    async oscarWinners(){
        const collection = this.db.collection('actor');
        const oscarWinners = await collection.find({ "awards.name": "Oscar" }).toArray();
        await this.conexion.close();
        return {oscarWinners: oscarWinners}
    }
    async actorBornAfter1980(){
        const collection = this.db.collection('actor');
        const actorBornAfter1980 =await collection.find({ date_of_birth: { $gt: "1980-01-01" } }).toArray();
        await this.conexion.close();
        return {actorBornAfter1980: actorornAfter1980}
    }
    async actorWithMostAwards(){
        const collection = this.db.collection('actor');
        const actorWithMostAwards = await collection.aggregate([
            { $unwind: "$awards" },
            { $group: { _id: "$full_name", totalAwards: { $sum: 1 } } },
            { $sort: { totalAwards: -1 } },
            { $limit: 1 }
            ]).toArray();
            return {actorWithMostAwards: actorWithMostAwards}
    }

    async totalactor(){
        const collection = this.db.collection('actor');
        const totalactor = await collection.countDocuments();
        await this.conexion.close();
        return { totalactor: totalactor}
    }

    async averageAge() {
        const collection = this.db.collection('actor');
        const result = await collection.aggregate([
            {
                $project: {
                    age: {
                        $subtract: [
                            { $year: new Date() },
                            { $year: { $dateFromString: { dateString: "$date_of_birth" } } }
                        ]
                    }
                }
            },
            { $group: { _id: null, averageAge: { $avg: "$age" } } }
        ]).toArray();
        
        await this.conexion.close();
        const averageAge = result.length > 0 ? result[0].averageAge : null;
    
        return {averageAge: averageAge};
    }
    
    async actorWithInstagram() {
        const collection = this.db.collection('actor');
        const actorWithInstagram = await collection.find(
            { "social_media.instagram": { $exists: true } },
            { projection: { full_name: 1, "social_media.instagram": 1, _id: 0 } }
        ).toArray();
        await this.conexion.close();
        return JSON.stringify({ actorWithInstagram: actorWithInstagram }, null, 2);
    }
    
    async totalAwardsInMovies(){
        const collection = this.db.collection('actor');
        const totalAwardsInMovies = await collection.aggregate([
            { $unwind: "$awards" },
            { $count: "totalAwards" }
            ]).toArray();
        await this.conexion.close();
        return {totalAwardsInMovies: totalAwardsInMovies}
    } 
    async actorWithAwardsAfter2015(){
        const collection = this.db.collection('actor');
        const actorWithAwardsAfter2015 = await collection.find({ "awards.year": { $gt: 2015 } }).toArray();
        await this.conexion.close();
        return {actorWithAwardsAfter2015: actorWithAwardsAfter2015}
    }

}