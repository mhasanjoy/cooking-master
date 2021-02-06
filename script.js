const ingredientsSection = () => {
    const ingredients = document.getElementById("ingredients");
    ingredients.innerHTML = null;
    return ingredients;
};


const displayIngredients = (meal, mealDiv) => {
    mealDiv.addEventListener("click", function(){
        const ingredients = ingredientsSection();
        const ingredientsDiv = document.createElement("div");
        ingredientsDiv.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h2>${meal.strMeal}</h2>
                <h5>Ingredients</h5>
                <ul>
                    <li>${meal.strIngredient1}</li>
                    <li>${meal.strIngredient2}</li>
                    <li>${meal.strIngredient3}</li>
                    <li>${meal.strIngredient4}</li>
                    <li>${meal.strIngredient5}</li>
                    <li>${meal.strIngredient6}</li>
                </ul>
            `;
            ingredients.appendChild(ingredientsDiv);
    });
};


const displayMeals = meals => {
    const mealsSection = document.getElementById("meals");
    mealsSection.innerHTML = null;
    const ingredients = ingredientsSection();
    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.className = "meal";
        mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <p>${meal.strMeal}</p>
        `;
        mealsSection.appendChild(mealDiv);

        displayIngredients(meal, mealDiv);
    });
};


document.getElementById("search-btn").addEventListener("click", function(){
    const searchingText = document.getElementById("searching-text").value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchingText}`)
    .then(response => response.json())
    .then(data => displayMeals(data.meals))
    .catch(error => {
        const ingredients = ingredientsSection();
        ingredients.innerHTML = `
            <h1 id="error">Your search - ${searchingText} - did not match any food items.</h1>
        `;
    });
});