import { movie } from './js/model/movie.js';
import { Actor } from './js/model/actor.js';

async function main() {
    let obj;

    obj = new movie();
    // console.log(await obj.distinctGenres());
    //console.log(await obj.moviesWithActor1());
    //console.log(await obj.moviesWithJohnDoe());
    //console.log(await obj.moviesWithPrincipalactor());
    //console.log(await obj.moviesWithJohnDoeAndBluray());
    //console.log(await obj.sciFiMoviesWithActor3());
    //console.log(await obj.totalBlurayValue());
    console.log(await obj.moviesWithActor2());

    //obj = new Actor();
    //console.log(await obj.totalDvdValue());
    //console.log(await obj.totalAwards());
    //console.log(await obj.oscarWinners());
    //console.log(await obj.actorBornAfter1980());
    //console.log(await obj.actorWithMostAwards());
    //console.log(await obj.totalactor());
    //console.log(await obj.averageAge());
    //console.log(await obj.actorWithInstagram());
    //console.log(await obj.totalAwardsInMovies());
    //console.log(await obj.actorWithAwardsAfter2015());
}

main().catch(console.error);