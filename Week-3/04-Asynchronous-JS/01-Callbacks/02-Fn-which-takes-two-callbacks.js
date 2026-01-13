/**
 * Function which takes two callbacks:
 * Q. Write a function willThanosKillMe(). This function will take
 *    three parameters:
 *    1. Your name
 *    2. Function to call if Thanos doesn't kill you.
 *    3. Function to call if Thanos does kill you.
 * 
 * => This function will call success callback if your name has even
 *    characters. You won't die.
 * => But if your name has odd number of characters then you're going
 *    to die. Sorry!
 * 
 * => Now, call this function with given parameters. The success fn
 *    should console a happy message: 'Yes! I am alive!' and the failure
 *    function should console your will:
 *    'Give my bose speakers and apple headphones to my sister'. 
 * */ 

/**
 * 1. Main fn - willThanosKillMe(name, deadCb, AliveCb)
 * 2. Cb      - (a) deadCb - print("Give my bose speakers...")
 *            - (b) aliveCb - print("Yay! I am alive!")
*/

const willThanosKillMe = (name, deadCb, AliveCb) => name.length % 2 == 0 ? AliveCb() : deadCb();

willThanosKillMe("tanay", () => console.log("Give my bose speakers to my sister"), () => console.log("Yay! I am alive!"));

/**
 * Understanding:
 * Say in function you were calling a server on Titan to see whether
 * Thanos is going to kill you or not. Obviously that network call
 * would take time. Making the entire program wait for one network call
 * (async task) wouldn't look good na! Hence, the callbacks.
 * 
 * const willThanosKillMeAsync = (name, deadCb, AliveCb) => 
 * callAServerOnTitan(name) ? AliveCb() : deadCb();
 *           |
 *           V
 *      Async Call
 * 
 * Note: Next, we will see how to handle async calls.
*/