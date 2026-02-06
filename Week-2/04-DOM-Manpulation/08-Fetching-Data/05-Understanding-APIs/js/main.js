/**
 * What is an API?
 * - A simple interface for some complex action!
 * - If I want to turn off the camera, what is the most primal way to
 *   turn off the camera? Rip the plug off, but the manufacturer doesn't
 *   want me to rip of the plug all the time to turn it on or off. So,
 *   Sony give us an interface i.e. button, to turn it on or off.
 * - Now think about all the complex things that has to happen to turn
 *   this camera on or off. We press a button then a capacitors fills
 *   and the power comes in and the camera turns on. That button is a
 *   simple interface for some very complex action.
 * - When we get the API, we are going to use Web APIs. 
 * - If we request information from the URLs, something veru complex is
 *   going to happen far away on a server. That server is going to be
 *   able to hear that we've made a request, it's going to get some data,
 *   organize it and then send it back to us. So, even though we are
 *   doing like a Web API, it's still a simple interface for some complex
 *   thing that happen, just like the power button.
 * - Our simple interface will be the URL, and with that URL, we can
 *   make a request and get some complex stuff back.
 * 
 * - Now, the way that our data is going to comeback, it's not going to
 *   be a delicious bowl of soup as much as we wish to be happen. We
 *   are going to get something called JSON. 
 * - Basically, the server is going to bundle up all the data and send
 *   it back to us as a JSON object, and then on our end, we are going 
 *   to get this lovely object that we can parse in, pull stuff out
 *   and get what we need.
 * - So, the URL is the interface, we make our request to server, that
 *   server hears the request and sends us an object back.
*/

/**
 * APIs:
 * - APIs returns a JSON object that we can use within our apps.
 * - Here is one bit of syntax that we can use to make a request to 
 *   an API.
 * - This is the dog.ceo API, which enable use to get images back from
 *   their server:
*/

/**
 * fetch("https://dog.ceo/api/breeds/image/random") // <== interface
 * .then(res => res.json())  // parse response as JSON
 * .then(data => { console.log(data); })
 * .catch(err => { console.log(`error ${err}`);
 * })
*/ 

/**
 * 1. fetch: "https://dog.ceo/api/breeds/image/random" <== interface
 *    - This fetch() will take interface as an input and then the 
 *      object will come back as resonse.
 * 2. .then(res => res.json()) : Response object will come in json format
 * 3. .then(data => { console.log(data); })
 *    - Any response we get back from the API will be passed into this
 *      parameter, and then we can do whatever we want.
 *    - Right now, we are just logging it.
*/

/**
 * Q. Get a dog photo from the dog.ceo api and place the photo in the DOM. 
*/

fetch("https://dog.ceo/api/breeds/image/random") // <== interface
.then(res => res.json())  // parse response as JSON
.then(data => { 
    console.log(data.message); 
    document.querySelector('img').src = data.message;
})
.catch(err => { console.log(`error ${err}`);
})

