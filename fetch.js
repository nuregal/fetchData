const btn = document.getElementById("btn");
const div = document.getElementById("div");
const form = document.querySelector('form');
const formInput = document.querySelector("input[type='search']");
const h1 = document.querySelector('h1');

btn.addEventListener("click", getData);
form.addEventListener('submit',getData)

function getData(e) {
  e.preventDefault()

  let loading = true;
    if(loading){ div.innerHTML = `
      <img src='./loading.gif' class="loading"/>
 `}

  const searchValue = formInput.value;
  console.log('searchvalue ', searchValue); 
  setTimeout(()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((resp) => resp.json())
    .then((data) => {
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
      console.log(error)
      h1.innerHTML = `${searchValue} NOT FOUND`
      div.innerHTML = ''

    });
  }, 2000)
  
}

function showData(meals) {
 //show data to the ui 
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