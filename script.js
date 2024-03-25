const API_KEY="62c69182f22945999179c97c13dd6e14";
const recipeList1=document.getElementById("recipeList")
function displayRecipes(recipes){
    recipeList1.innerHTML=""
    recipes.forEach((recipe) => {
      const recipeItem1=document.createElement("li")
      recipeItem1.classList.add("recipeitem")
      recipeImage1=document.createElement("img")
      recipeImage1.src=recipe.image;
      recipeImage1.alt="recipe image";

      recipeTitle1=document.createElement("h2")
      recipeTitle1.innerHTML=recipe.title

      recipeIngredients1=document.createElement("p");
      recipeIngredients1.innerHTML=`<strong>Ingredients:</strong>
      ${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(", ")}`;

      recipeLink=document.createElement("a");
      recipeLink.href=recipe.sourceUrl;
      recipeLink.innerText="View Recipe";

      recipeItem1.appendChild(recipeImage1);
      recipeItem1.appendChild(recipeTitle1);
      recipeItem1.appendChild(recipeIngredients1);
      recipeItem1.appendChild(recipeLink);
      recipeList1.appendChild(recipeItem1);
    });
    
}

async function getRecipes(){
    const response=await fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`);
    const data=await response.json();
    console.log(data)
    return data.recipes
}

 async function init(){
    const recipes=await getRecipes();
    console.log(recipes);
    displayRecipes(recipes);
 }

init();
document.addEventListener('DOMContentLoaded', function() {
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const addRecipeModal = document.getElementById('addRecipeModal');
    const closeModalBtn = document.querySelector('.close');
    const saveRecipeBtn = document.getElementById('saveRecipeBtn');
    const searchInput = document.getElementById('searchInput');
    const recipeList = document.getElementById('recipeList');

    addRecipeBtn.addEventListener('click', function() {
        addRecipeModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', function() {
        addRecipeModal.style.display = 'none';
    });

    saveRecipeBtn.addEventListener('click', function() {
        const recipeNameInput = document.getElementById('recipeNameInput').value;
        const recipeTextInput = document.getElementById('recipeTextInput').value;

        if (recipeNameInput && recipeTextInput) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${recipeNameInput}</strong>: ${recipeTextInput}`;
            recipeList.appendChild(listItem);
            addRecipeModal.style.display = 'none';
            document.getElementById('recipeNameInput').value = '';
            document.getElementById('recipeTextInput').value = '';
        } else {
            alert('Please fill in both fields.');
        }
    });

    searchInput.addEventListener('keyup', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const recipes = recipeList.getElementsByTagName('li');
        Array.from(recipes).forEach(function(recipe) {
            const recipeText = recipe.textContent.toLowerCase();
            if (recipeText.includes(searchTerm)) {
                recipe.style.display = 'block';
            } else {
                recipe.style.display = 'none';
            }
        });
    });
});
