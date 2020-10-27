const labelElement = document.querySelector("#label");
const imageElement = document.querySelector("#cake-img");
const ingredientsListElement = document.querySelector(".ingredients");
const recipeUrlElement = document.querySelector("#recipe-url");

checkedRadio = document.querySelector("input[name='ingredient']:checked");
searchIngredient(checkedRadio);

/**
 * This function adds and ingredient a url, that is used to
 * make the call to the API for birthday cakes with that ingredient
 *
 * @param {object} radioInput radio input DOM Element
 */
function searchIngredient(radioInput) {
  ingredientsListElement.innerHTML = "";
  const rootUrl = "https://api.edamam.com/search";
  fetch(
    `${rootUrl}?q=birthday+cake+${radioInput.value}&app_id=589ecbd6&app_key=6d6116bfcbdc60fe641222727dc9eb8f`
  )
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
      let ingredientList = data.hits[0].recipe.ingredientLines;

      // Since different cakes will have different amount of ingredients
      // then this codes create list items according to the number of ingredients

      ingredientList.forEach((elem) => {
        const item = document.createElement("li");
        ingredientsListElement.appendChild(item);
        const lowCaseElem = elem.toLowerCase();
        if (
          lowCaseElem.includes("for the cake") ||
          lowCaseElem.includes("for the frosting")
        ) {
          item.classList.add("heading-item");
        }
        item.innerHTML = elem;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
