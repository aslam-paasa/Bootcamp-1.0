/**
 * - Both claire and nikki have the class 'contestant' but only nikki
 *   have also the class 'rose'. 
 * - Just like querySelector can select one element at a time, 
 *   querySelectorAll can grab all the elements of same class at a time.
*/
const contestants = document.querySelectorAll('.contestant');

/**
 * We don't need to understand this, just have to know that this is 
 * going to add event-listener(smurf) to every single thing that is
 * inside the 'contestant' class. And once they are clicked we check
 * whether or not the thing that we clicked has 'rose'. Because if it
 * has 'rose' class then we want to toggle nikki's photo and if it 
 * doesn't, we want to alert wrong.
*/

/**
 * Array
 * We have this structure in javascript that can hold multiple things
 * and that structure is called an Array. Think of this like a variable
 * that can hold more than one thing i.e. all of our contestants.
 * 
 * from:
 * This fn 
 * 
 * forEach:
 * This method will go through each one of the things that have the
 * class called contestant and add a event-listener(smurf) to it.
 * So, instead of doing it on one element, we are now adding it to
 * every element that had that class contestant
*/
Array.from(contestants).forEach(element => element.addEventListener('click', checkForRose))

function checkForRose(click){
	/**
	 * Look at the things that we have clicked on(target), and check if
	 * it contains the class of 'rose'. If it does, toggle to hidden
	*/
	if(click.target.classList.contains('rose')){
		document.querySelector('#nikki').classList.toggle('hidden')
	}else{
		alert("Wrong!");
	}
}
