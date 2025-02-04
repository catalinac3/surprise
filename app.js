const recipeDiv = document.querySelector("#recipesDiv");
checkedRadio = document.querySelector("input[name='ingredient']:checked");
searchIngredient(checkedRadio);

/**
 * A pseudorandom integers generator used to randomise the recipes requested in API call.
 * Used as a from parameter in a request URL.
 * @param {number} max
 * @returns {number} A pseudorandom integer between 0 and max - 1
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * This function adds and ingredient a url, that is used to
 * make the call to the API for birthday cakes with that ingredient
 *
 * @param {object} radioInput radio input DOM Element
 */
function searchIngredient(radioInput) {
  recipeDiv.innerHTML = "";
  const rootUrl = "https://api.edamam.com/search";
  const startNum = getRandomInt(50);
  fetch(
    `${rootUrl}?q=birthday+cake+${radioInput.value}&from=${startNum}&to=${
      startNum + 9
    }&app_id=589ecbd6&app_key=6d6116bfcbdc60fe641222727dc9eb8f`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // The default number of search is 10 items, i.e when "from=" is specified but "to=" is not,
      // or when neither "to=" or "from=" are specified in the apiUrl.
      // With a free plan we are allowed to request max of 100 items.

      data.hits.forEach((element) => {
        // creates a div to contain each recipe
        let recipeContainer = document.createElement("div");
        recipeContainer.classList.add("item");
        recipeDiv.appendChild(recipeContainer);

        // then this codes create list of health labels for each recipe
        const healthLabels = element.recipe.healthLabels;
        let organizedLabels = "";
        healthLabels.forEach((elem) => {
          const elemlc = elem.toLowerCase();
          const labelSet = new Set([
            "alcohol-free",
            "vegetarian",
            "peanut-free",
            "tree-nut-free",
            "gluten-free",
            "wheat-free",
            "egg-free",
            "dairy-free",
          ]);
          if (labelSet.has(elemlc)) {
            organizedLabels += `<li>${elem}</li>`;
          }
        });
        if (organizedLabels != "") {
          organizedLabels = `<li class="heading-list-item">Health labels:</li> ${organizedLabels}`;
        }
        // creates label element -- title of the recipe, added picture, add list of ingredients, adds button with a link to the recipe and deco icon
        recipeContainer.innerHTML = `<h3>${formatTitle(
          element.recipe.label
        )}</h3>
                                    <img src=${element.recipe.image}>
                                    <ul>${organizedLabels}</ul>
                                    <form action=${
                                      element.recipe.url
                                    } method="get" target="_blank">
                                    <button type="submit">to the recipe <i class="fas fa-birthday-cake"></i></button>
                                    </form>`;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/**
 * this function makes sure that on the title, the first
 * letter of each word is upper case and the rest of the word is lower case
 * @param {string} phrase 
 * @returns 
 */
function formatTitle(phrase) {
  console.log (phrase);
  let wordList = phrase.split(" ");
  let newWordList = [];

  wordList.forEach((word) => {
    if (typeof word == "string") {
      newWordList.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    } else {
      newWordList.push(word);
    }
  });
  return newWordList.join(" ");
}
