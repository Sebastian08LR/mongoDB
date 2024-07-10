# Consultas Blockbuster

1. **Contar el número total de copias de DVD disponibles en todos los registros:**

   ```javascript
   db.getCollection('movie').aggregate([
  { $unwind: "$format" },
  { $match: { "format.name": "dvd" } },
  { $group: { _id: null, totalCopies: { $sum: "$format.copies" } } }
    ])
   ```

2. **Encontrar todos los actores que han ganado premios Oscar:**

   ```javascript
        const oscarWinners =  db.authors.find({ "awards.name": "Oscar" }).toArray();
        console.log(oscarWinners);
   ```

3. **Encontrar la cantidad total de premios que ha ganado cada actor:**

   ```javascript
        const totalAwards = await actors.aggregate([
    { $unwind: "$awards" },
    { $group: { _id: "$full_name", totalAwards: { $sum: 1 } } }
    ]).toArray();
    console.log(totalAwards);
   ```

4. **Obtener todos los actores nacidos después de 1980:**

   ```javascript
    const actorsBornAfter1980 = db.authors.find({ date_of_birth: { $gt: "1980-01-01" } }).toArray();
    console.log(actorsBornAfter1980);   
   ```

5. **Encontrar el actor con más premios:**

   ```javascript
    const actorWithMostAwards =  db.authors.aggregate([
    { $unwind: "$awards" },
    { $group: { _id: "$full_name", totalAwards: { $sum: 1 } } },
    { $sort: { totalAwards: -1 } },
    { $limit: 1 }
    ]).toArray();
    console.log(actorWithMostAwards);
   ```

6. **Listar todos los géneros de películas distintos:**

   ```javascript
    const distinctGenres =  db.movis.distinct("genre");
    console.log(distinctGenres);

   ```

7. **Encontrar películas donde el actor con id 1 haya participado:**

   ```javascript
   const moviesWithActor1 = db.movis.find({ "character.id_actor": 1 }).toArray();
    console.log(moviesWithActor1);
   ```

8. **Calcular el valor total de todas las copias de DVD disponibles:**

   ```javascript
   const totalDvdValue = db.movis.aggregate([
    { $unwind: "$format" },
    { $match: { "format.name": "dvd" } },
    { $group: { _id: null, totalValue: { $sum: { $multiply: ["$format.copies", "$format.value"] } } } }
    ]).toArray();
    console.log(totalDvdValue);

   ```

9. **Encontrar todas las películas en las que John Doe ha actuado:**

   ```javascript
    const moviesWithJohnDoe = db.movis.find({ "character.id_actor": 1 }).toArray();
    console.log(moviesWithJohnDoe);
   ```

10. **Encontrar el número total de actores en la base de datos:**

    ```javascript
    const totalActors = db.authors.countDocuments();
    console.log(totalActors);
    ```

11. **Encontrar la edad promedio de los actores en la base de datos:**

    ```javascript
    const averageAge = await actors.aggregate([
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
    console.log(averageAge);
    ```

12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    ```javascript
    const actorsWithInstagram = db.authors.find({ "social_media.instagram": { $exists: true } }).toArray();
    console.log(actorsWithInstagram);
    ```

13. **Encontrar todas las películas en las que participan actores principales:**

    ```javascript
    const moviesWithPrincipalActors = db.movis.find({ "character.rol": "principal" }).toArray();
    console.log(moviesWithPrincipalActors);
    ```

14. **Encontrar el número total de premios que se han otorgado en todas las películas:**

    ```javascript
    const totalAwardsInMovies = db.authors.aggregate([
    { $unwind: "$awards" },
    { $count: "totalAwards" }
    ]).toArray();
    console.log(totalAwardsInMovies);
    ```

15. **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

    ```javascript
    const moviesWithJohnDoeAndBluray = db.movis.find({
    "character.id_actor": 1,
    "format.name": "Bluray"
    }).toArray();
    console.log(moviesWithJohnDoeAndBluray); 
    ```

16. **Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**

    ```javascript
    const sciFiMoviesWithActor3 = await movies.find({
    genre: "Ciencia Ficción",
    "character.id_actor": 3
    }).toArray();
    console.log(sciFiMoviesWithActor3);
    ```

17. **Encontrar la película con más copias disponibles en formato DVD:**

    ```javascript
    const movieWithMostDvdCopies = db.movis.aggregate([
    { $unwind: "$format" },
    { $match: { "format.name": "dvd" } },
    { $sort: { "format.copies": -1 } },
    { $limit: 1 }
    ]).toArray();
    console.log(movieWithMostDvdCopies);

    ```

18. **Encontrar todos los actores que han ganado premios después de 2015:**

    ```javascript
    const actorsWithAwardsAfter2015 = db.authors.find({ "awards.year": { $gt: 2015 } }).toArray();
    console.log(actorsWithAwardsAfter2015);
    ```

19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**

    ```javascript
    const totalBlurayValue = db.movis.aggregate([
    { $unwind: "$format" },
    { $match: { "format.name": "Bluray" } },
    { $group: { _id: null, totalValue: { $sum: { $multiply: ["$format.copies", "$format.value"] } } } }
    ]).toArray();
    console.log(totalBlurayValue);
    ```

20. **Encontrar todas las películas en las que el actor con id 2 haya participado:**

    ```javascript
    const moviesWithActor2 = db.movis.find({ "character.id_actor": 2 }).toArray();
    console.log(moviesWithActor2);
    ```

