const recipeDiv = document.querySelector("#recipes");
checkedRadio = document.querySelector("input[name='ingredient']:checked");
searchIngredient(checkedRadio);

/**
 * This function adds and ingredient a url, that is used to
 * make the call to the API for birthday cakes with that ingredient
 *
 * @param {object} radioInput radio input DOM Element
 */
function searchIngredient(radioInput) {
  recipeDiv.innerHTML = "";
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

      let recipeArray = [];
      for (let i = 0; i < data.hits.length; i++) {
        // creates a div to contain each recipe
        recipeArray[i] = document.createElement("div");
        recipeDiv.appendChild(recipeArray[i]);

        // Since different cakes will have different amount of ingredients
        // then this codes create list of ingredients according to the number of ingredients
        const ingredientsList = data.hits[i].recipe.ingredientLines;
        let organizedIngredients = "";
        ingredientsList.forEach(elem => {
          const lowCaseElem = elem.toLowerCase();
          const resultElem =
            lowCaseElem.includes("for the cake") ||
            lowCaseElem.includes("for the frosting")
              ? `<li class="heading-item">${elem}</li>`
              : `<li>${elem}</li>`;

          organizedIngredients += resultElem;
        });
        // creates label element -- title of the recipe, added picture, add list of ingredients, adds button with a link to the recipe and deco icon
        recipeArray[i].innerHTML = `<h3>${data.hits[i].recipe.label}</h3>
                                    <img src=${data.hits[i].recipe.image}>
                                    <ul>${organizedIngredients}</ul>
                                    <a href ="${data.hits[i].recipe.url}"><button>to the recipe <i class="fas fa-birthday-cake"></i></button></a>`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}