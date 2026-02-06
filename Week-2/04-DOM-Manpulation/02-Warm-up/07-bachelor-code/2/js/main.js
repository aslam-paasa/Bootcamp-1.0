const andi = document.querySelector('#andi')
const claire = document.querySelector('#claire')
const sharleen = document.querySelector('#sharleen')

document.querySelector('#andiNext').addEventListener('click', andiNext)
document.querySelector('#claireNext').addEventListener('click', claireNext)
document.querySelector('#sharleenNext').addEventListener('click', sharleenNext)

/**
 * All the images are not showing by default, because in the html element
 * class is set to hidden. So, we can either add that class to make 
 * something hide, or remove that class to make something visible.
 * 
 * Now, when I click on andy's text, it runs a set of instructions called
 * andiNext, then this fn will:
 * a. add hidden class to claire & sharleen just to make sure they are
 *    not there.
 * b. and we are toggling hidden on andy. Toggling is like a light
 *    switch. So, if it is there, we remove it, and it is not there, 
 *    we add it.
*/

/**
 * Think of classList as a list of classes an element has. You can use
 * it to:
 * a. Add a class to an element.
 * b. Remove a class from an element.
 * c. Check if a class is present on an element.
 * d. Toggle a class(add it if it's not there, or remove it if it is).
*/


// <h2 id="andiNext" class="hidden">Andi</h2>
function andiNext(){
	claire.classList.add('hidden')
	sharleen.classList.add('hidden')
	andi.classList.toggle('hidden')
}


// <h2 id="claireNext" class="hidden">Claire</h2>
function claireNext(){
	andi.classList.add('hidden')
	sharleen.classList.add('hidden')
	claire.classList.toggle('hidden')
}

// <h2 id="sharleenNext" class="hidden">Sharleen</h2>
function sharleenNext(){
	andi.classList.add('hidden')
	claire.classList.add('hidden')
	sharleen.classList.toggle('hidden')
}
