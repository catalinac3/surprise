const rootUrl = "https://api.edamam.com/search";
const recipeUrlElement = document.querySelector("#recipe-url");
const labelElement = document.querySelector("#label");
const imageElement = document.querySelector("#cake-img");
const ingredientsListElement = document.querySelector(".ingredients");

const apiUrl = `${rootUrl}?q=birthday+cake+strawberry&app_id=589ecbd6&app_key=6d6116bfcbdc60fe641222727dc9eb8f`;

const form = document.querySelector("#choose-ingredient-form");
// list of all input elements
const inputElements = document.querySelectorAll("input[name='ingredient']");
form.addEventListener("submit", searchIngredient);

fetchRecipies(apiUrl);

function fetchRecipies(apiUrl) {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // The default number of search is 10 items, i.e when "from=" is specified but "to=" is not,
      // or when neither "to=" or "from=" are specified in the apiUrl.
      // With a free plan we are allowed to request max of 100 items.
      // console.log(data.hits.length);
      recipeUrlElement.setAttribute("href", data.hits[0].recipe.url);
      labelElement.innerHTML = data.hits[0].recipe.label;
      imageElement.src = data.hits[0].recipe.image;
      const ingredientList = data.hits[0].recipe.ingredientLines;
      // Since different cakes will have different amount of ingredients
      // then this codes create list items according to the number of ingredients
      ingredientList.forEach((elem) => {
        const item = document.createElement("li");
        ingredientsListElement.appendChild(item);
        item.innerHTML = elem;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
