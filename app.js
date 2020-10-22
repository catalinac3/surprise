const rootUrl = "https://api.edamam.com/search"
const recipeUrlElement = document.querySelector("#recipe-url")
const labelElement =  document.querySelector("#label")
const imageElement =  document.querySelector("#cake-img")
const ingredientsListElement =  document.querySelector(".ingredients")

let urlApi = `${rootUrl}?q=birthday+cake&app_id=589ecbd6&app_key=6d6116bfcbdc60fe641222727dc9eb8f&from=0&to=1`

fetch(urlApi)
.then((response) => response.json())
.then((data) => {
  console.log('Success:', data);
  recipeUrlElement.setAttribute("href", data.hits[0].recipe.url);
  labelElement.innerHTML = data.hits[0].recipe.label;
  imageElement.src = data.hits[0].recipe.image;
  let ingredientList = data.hits[0].recipe.ingredientLines
  // Since different cakes will have different amount of ingredients 
  // then this codes create list items according to the number of ingredients
  ingredientList.forEach(elem => {
    let item = document.createElement("li");
    ingredientsListElement.appendChild(item);
    item.innerHTML = elem;
  });

})
.catch((error) => {
  console.error('Error:', error);
})