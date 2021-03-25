const btn = document.getElementById("btn");
const div = document.getElementById("div");
const form = document.querySelector('form');
const formInput = document.querySelector("input[type='search']");
const h1 = document.querySelector('h1');

btn.addEventListener("click", getData);

function getData(e) {
  e.preventDefault()

  let loading = true;
  if(loading){ div.innerHTML = `
      <img src='./loading.gif' class="loading"/>
 `}

  const searchValue = formInput.value;

  setTimeout(()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((resp) => resp.json())
    .then((data) => {
      if(data.meals == null) {
        h1.innerHTML = `${searchValue} NOT FOUND`
        div.innerHTML = ''
      }
        loading = false;
        const meals = data.meals.map((value) => {
        const {
          idMeal: id,
          strMeal: meal,
          strCategory: category,
          strInstructions: instructions,
         strMealThumb: image,
        } = value;
        return ( { id,meal,category,instructions,image });
      });
      showData(meals)
    })
    .catch((error) => {


    });
  }, 2000)
  
}

function showData(meals) {
 //show data to the ui 
 h1.innerHTML = "Latest Meals";
 div.innerHTML = '';
  meals.forEach(meal =>  {
    const mealContainer = createMealContainer(meal); 
    div.append(mealContainer)
});
}

function createMealContainer({id,meal,category,instructions,image}){
  const container = document.createElement('div');
  container.className= "meal-container"
  container.innerHTML = `
  <div class="image-container">
  <img src=${image} />
  </div>

  <div class="text-container">
    <h2>${meal}</h2>
    <p> <span>Category: </span> ${category}</p>
  </div>
  `
  // <p class="instructions">${instructions}</p>

  return container;

}


document.addEventListener('DOMContentLoaded', getData)