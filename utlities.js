/**
 * this function adds and ingredient to the search
 * to be more specific about the cake search
 * it is connected to the radio buttons
 *
 * @param {object} e - submit event
 */
function searchIngredient(e) {
  e.preventDefault();
  inputElements.forEach((elem) => {
    if (elem.checked == true) {
      const apiUrl = `${rootUrl}?q=birthday+cake+${elem.value}&app_id=589ecbd6&app_key=6d6116bfcbdc60fe641222727dc9eb8f`;
      fetchRecipies(apiUrl);
    }
  });
}
