const express = require('express');
const cors = require("cors");
const Promise = require("bluebird");
const request = Promise.promisifyAll(require("request"));
const _ = require("lodash");
const path = require("path");

const app = express();

app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/assets', express.static(path.join(__dirname + '/assets')));
app.use(cors());

function mapper (meal) {
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

    return formattedMeal;
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname)+"/index.html");
});

app.get('/food/:id', function (req, res) {
    const { id } = req.params;
    request.getAsync(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => {
        const meal = _.get(JSON.parse(response.body), "meals.0", {});
        res.json(mapper(meal));
    });
});

app.get('/food', function (req, res) {
    function getRandomMeal () {
        return request.getAsync("http://www.themealdb.com/api/json/v1/1/random.php").then((response) => {
            const meal = _.get(JSON.parse(response.body), "meals.0", {});
            const formattedMeal = mapper(meal);
    
            return Promise.resolve(formattedMeal);
        });
    }

    const mealsPromises = _.map(Array(10), () => getRandomMeal());
    Promise.all(mealsPromises).then((response) => res.json(response));
    
});

app.listen(1234, () => console.log('Example app listening on port 1234!'));
