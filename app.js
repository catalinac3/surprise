const rootUrl = "https://api.edamam.com/search"
const recipeUrlElement = document.querySelector("#recipe-url")

let urlApi = `${rootUrl}?q=birthday+cake&app_id=589ecbd6&app_key=6d6116bfcbdc60fe641222727dc9eb8f&from=0&to=1`

fetch(urlApi)
.then((response) => response.json())
.then((data) => {
  console.log('Success:', data);
  recipeUrlElement.setAttribute("href", data.hits[0].recipe.url);
})
.catch((error) => {
  console.error('Error:', error);
})