/**
 * Fetch Dungeon and Dragon API: Place subclasses in <ul> element.
 * - Using this API, we can get specific spells, and when we get that
 *   specific spell, we want to put it into the DOM.
 * - But this API return all the classes & subclasses that have used the
 *   spell or associated with that spell.
 * - So, we want to make a request to this API, and then we will get
 *   the subclasses, and then put them into the <ul>.
*/
document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
    const choice = document.querySelector('input').value
    const url = `https://www.dnd5eapi.co/api/spells/${choice}` // spell: acid-arrow

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data.subclasses);
            data.subclasses.forEach(obj => {
                const li = document.createElement('li');
                li.textContent = obj.name;
                document.querySelector('ul').appendChild(li); // appendChild: addChild
            });
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

