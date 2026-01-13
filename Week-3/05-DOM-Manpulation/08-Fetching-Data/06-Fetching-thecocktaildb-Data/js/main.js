/**
 * Q. The user will enter a cocktail. Get a cocktail name, photo, and 
 *    instructions and place them in the DOM.
*/


/**
 * APIs:
 * There is one other API that we looked at i.e. thedocktaildb API,
 * and we get some drinks back from the API. The cool thing is, the URL
 * is our interface and sometimes we can pass stuffs into our URL:
 *                                                                        Query Params
 *                                                                        <---------->
 * => const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search/php?s=margarita'
 *                                                                        <---------->
 * After this php, our URL ends and then we have the question mark and
 * everuthing else after that question mark, we call a query parameter.
 * 
 * const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search/php?s=margarita';
 * fetch(URL)
 * .then(res => res.json())
 * .then(data => console.log(data))
 * .catch(err => console.log(`error: ${err}`))
 * 
 * 
 * Certain APIs, when we are making requests and we're passing in that
 * URL, sometimes they enable us to add stuff to it so that we can get
 * specific data back. For example, I don't want just any soup, I want
 * specific chicken soup. So, we can do 's=chickenSoup'
 * Some APIs need Query Parameters to return the correct data.
*/

document.querySelector('button').addEventListener('click', getDrink)

function getDrink() {
    let drinkChoice = document.querySelector('input').value;
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drinkChoice;

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            console.log(data.drinks[0]); // gin
            document.querySelector('h2').innerText = data.drinks[0].strDrink;
            document.querySelector('img').src = data.drinks[0].strDrinkThumb;
            document.querySelector('h3').innerText = data.drinks[0].strInstructions;
        })
        .catch(err => console.log(`error: ${err}`))
}
