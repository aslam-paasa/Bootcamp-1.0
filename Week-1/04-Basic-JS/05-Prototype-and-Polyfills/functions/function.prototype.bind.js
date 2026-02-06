/**
 * Function.prototype.bind:
 * > "The Function.prototype.bind() method creates a new function that,
 *    when called, it has 'this' keyword set to the provided value, with
 *    a given sequence of arguments preceding any provided when the new
 *    function is called"
*/

/**
 * A refersher on Function.prototype.bind and this:
 * > The native bind is a method on Function.prototype, so every function 
 *   you declare in your program automatically inherits such a method from 
 *   the prototype chain.
 * 
 * > One common use case for bind is to preserve the binding of a method when
 *   called as a function. 
 * > A method call is a function on an object that is being called. 
 * > For example:
*/

const person = {
    name: 'John',
    getName() {
      return this.name;
    },
  };
  
person.getName(); // 'John'
  

/**
 * > In a method call, this is implicitly bound to the object that is calling
 *   it. 
 * > Object here refers generally to either a plain old JavaScript object or
 *   a function (as we will see later).
*/

person.getName(); // In this case the `this` bound to the method call `getName()` is `person`.


/**
 * > However that's not the case for function calls. 
 * > A function call is different in that it doesn't get invoked on an object.
 * 
 * > For example, we can assign person.getName to another variable so it 
 *   contains a reference to the same function as person.getName:
*/

// const getName = person.getName;
// const name = getName(); // In strict mode, this raises a TypeError: Cannot read properties of undefined (reading 'name')


/**
 * > When the same method is called as a function call, there is no implicit
 *   binding, thus resulting in this bound to the global object (in non-strict
 *   mode) or an error being thrown (in strict mode).
 * > This is where bind comes in handy - we can preserve the context of the 
 *   method call to person via person.getName.bind(person):
*/

const getName = person.getName.bind(person);
const name = getName(); // 'John'


/**
 * > If you found this confusing, it is normal. 'this' is arguably one of the
 *   bad parts about JavaScript, as unlike everything else which is statically
 *   bound, only this is dynamically bound, which means that the caller of 
 *   the function, not the maker of the function, determines its binding. 
 * > This deviation is a source of confusion.
*/

/**
 * Another use case for bind: Create partially applied fns with pre-specified
 * initial arguments.
*/


/**
 * > Now that we understand how the bind works and its use case, lets' try 
 *   to implement it.
 *   a. Using call/apply
 *   b. Using Reflect
 *   c. Using Symbol
*/

/**
 * Approach-1: Using call/apply
 * > Firstly, since the native bind is a Function.prototype, our bind also
 *   has to be on it. We'll implement it as Function.prototype.myBind.
 * 
 *   Function.prototype.myBind = function () {
 *      // Implementation goes here... 
 *   }
 * 
 * > Secondly, the arguments Function.prototype.myBind accepts should be
 *   identical to the native one, where the first argument is the 'this'
 *   keyword that the target function is bound to, after that it takes 
 *   a variadic list of arguments to prepend to the arguments of the bound
 *   function.
 * 
 * > Next, it returns a new function, with its 'this' bound to the previous
 *   context passed to Function.prototype.myBind method. When the returned
 *   function is invoked, it gets the prepended arguments passed from
 *   Function.prototype.myBind as well.
 * 
 * > How do we refer to the original method that 'bind' is called upon in 
 *   the new returned function? Turns out we can access it via 'this' inside
 *   Function.prototype.myBind, as Function.prototype.myBind is invoked as
 *   a method call, thus, resulting in its 'this' bound to the method 'foo'
 *   implicitly.
*/

person.getAge.myBind(person); // myBind is a method call and its `this` is bound implicitly to the method `getAge`

/**
 * > Lastly, we can use Function.prototype.call or Function.prototype.apply
 *   inside the returned function, to call the original method with the
 *   thisArg passed to the myBind method.
*/

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {Function}
 */
Function.prototype.myBind = function (thisArg, ...argArray) {
    const originalMethod = this;
    return function (...args) {
      return originalMethod.apply(thisArg, [...argArray, ...args]);
    };
};
  