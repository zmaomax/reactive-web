const express = require('express');
const cors = require("cors");
const Promise = require("bluebird");
const request = Promise.promisifyAll(require("request"));
const _ = require("lodash");

const app = express();

app.use(cors());

app.get('/', function (req, res) {
    function getRandomMeal () {
        return request.getAsync("http://www.themealdb.com/api/json/v1/1/random.php").then((response) => {
            const meal = _.get(JSON.parse(response.body), "meals.0", {});
            const formattedMeal = {
                id: meal.idMeal,
                name: meal.strMeal,
                category: meal.strCategory,
                area: meal.strArea,
                instructions: meal.strInstructions,
                img: meal.strMealThumb,
                source: meal.strSource,
                ingredients: []
            };
    
            for (let i = 1; i <= 20; i++) {
                const ingredient = _.get(meal, `strIngredient${i}`, null);
                const measure = _.get(meal, `strMeasure${i}`, null);
    
                if (ingredient || measure) {
                    formattedMeal.ingredients.push({ ingredient, measure });
                }
            }
    
            return Promise.resolve(formattedMeal);
        });
    }

    const mealsPromises = _.fill(Array(10), getRandomMeal());
    Promise.all(mealsPromises).then((response) => res.json(response));
    
});

app.listen(1234, () => console.log('Example app listening on port 1234!'));
