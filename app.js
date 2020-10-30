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
        //creates label element -- title of the recipe
        const labelElement = document.createElement("h3");
        labelElement.innerHTML = data.hits[i].recipe.label;
        recipeArray[i].appendChild(labelElement);
        // adds the picture
        const imageElement = document.createElement("img");
        imageElement.src = data.hits[i].recipe.image;
        recipeArray[i].appendChild(imageElement);
        // adds the list of ingredients
        const ingredientsListElement = document.createElement("ul");
        recipeArray[i].appendChild(ingredientsListElement);
        let ingredientList = data.hits[i].recipe.ingredientLines;
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
        // adds button with a link to the recipe
        const recipeUrlElement = document.createElement("a");
        recipeArray[i].appendChild(recipeUrlElement);
        const recipeButton = document.createElement("button");
        recipeUrlElement.setAttribute("href", data.hits[i].recipe.url);
        recipeUrlElement.appendChild(recipeButton);
        recipeButton.innerHTML =
          "to the recipe <i class='fas fa-birthday-cake'></i>";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
