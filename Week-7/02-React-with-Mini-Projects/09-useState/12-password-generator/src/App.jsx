import './App.css'
import { useState, useEffect } from 'react';


/**
 * Jab mere passworGenerator fun call hua hoga to render hoga, isne under
 * statement padhna start kiya hoga.
 * 1. Sbse pehle isne const [Password, setPassword] = useState("AHBFHVVRG")
 *    ko padha jisko padhne k baad ye ek Password banaega aur uske andr
 *    "AHBFHVVRG" store kr dega, aur uske saath ek setPassword() fn bna dega
 * 2. Next line execute hogi: const [length, setLength] = useState(10) 
 *    jisse ek length baneg aur uske andr 10 store hoga aur uske saath ek
 *    setLength() fn bna dega jisse hum length ko update kar sakte h.
 * 3. Fir next line execute hogi: const [number, setNumber] = useState(false)
 *    jisse ek number baneg aur uske andr false store hoga aur uske saath ek
 *    setNumber() fn bna dega jisse hum number ko update kar sakte h.
 * 4. Fir next line execute hogi: const [character, setCharacter] = useState(false)
 *    jisse ek character baneg aur uske andr false store hoga aur uske saath ek
 *    setCharacter() fn bna dega jisse hum character ko update kar sakte h.
 * 
 * Fir niche ab render hoga:
 * 1. Sbse pehle h1 k andr password daal do i.e. "AHBFHVVRG" isliye humein
 *    screen m ye wala password dikha.
 * 2. Fir next line execute hogi:
 *    a. Min range 5 honi chaiye aur max 50 honi chaiye, aur value = length
 *       m stored value honi chaiye jo initially 10 hai isliye scroll bar
 *       mera 10th pe khada hai initially.
 *    b. Fir ek label bna denge jisme hum apne length ko dikhayenge.
 *    c. Fir next line execute hogi, number checkbox jisme defaultChecked
 *       hoga number state jisme humne initially false set kra hai isliye
 *       wo shuru m unchecked hoga.
 *    d. Fir next line execute hogi, character checkbox jisme defaultChecked
 *       hoga character state jisme humne initially false set kra hai isliye
 *       wo shuru m unchecked hoga.
*/

/**
 * Initial render to humein samajh aa gya, lekin ab hum isme kuch changes
 * karnge to mere code m kya fark padega?
 * 1. Ab hum range input ko scroll karnge value 10 se 19 m pahuch gya lekin
 *    usne length ko kaise update kiya hoga? Jaise hum scroll karnge to
 *    mera value change hoga, to mere e.target.value m 19 store hoga, aur
 *    uske changes ko track karne k liye humne ek onChange() function use
 *    hota hai jisme hum e.target.value ko pass kar dete hai aur ye usme
 *    changes k liye wait krta hai. Jaise hi e.target.value m 19 store hoga
 *    to hum setLength(e.target.value) ko call kar denge, aur ye length ko
 *    update kar dega.
 * 2. Ab hum number checkbox ko click karnge to usne number ko kaise update
 *    kiya hoga? Same process hoga, bass isme boolean value change hoga,
 *    aur uss boolean value ko track karne k liye humne ek onChange() function
 *    krnge aur jaise hi change milega to usse setNumber(!number) ko call
 *    kar denge.
 * 3. Similar with character checkbox.
*/

/**
 * Ab password generate hoga kaise?
 * - Create a function to generate password
 *   a. String: Jiske andr saare alphabeta honga both lower and upper case
 *   b. Fir puchnge ki kya mere password m numbers hone chaiye? Agar
 *      numbers true hua to hum add kr denge ki mere password m numbers bhi
 *      hoga.
 *   c. Fir puchnge ki kya mere password m special characters hone chaiye?
 *      Agar special characters true hua to hum add kr denge ki mere password
 *      m special characters bhi hoga.
 *   d. Ab mujhe apne password ko generate karna hai:
 *      - Mera loop mere length variable tak chalegi jisko hum range input
 *        se control krte h.
 *        - Ab string mere paas already hai, aur based on checkboxes humare
 *          paas updated str hoga.
 *        - Ab humara loop chlega aur har ek iteration m hum random number
 *          generate krenge till length variable tak. Aur jo random number
 *          generate hoga usse str ka idx maan lenge aur uss idx pe jo element
 *          hoga usse password variable me add krenge.
 *        - Ab humara password ready hoga.
 *   e. Fir hum setPassword(password) ko call krenge aur ye password ko
 *      update kar dega.
*/

/**
 * Ab iss function ko call kaise krnge without using button?
 * - Initial render hoga to saare state variables ko initialize hoga, aur
 *   aur uske baad ye function call hoga, aur jab ye function call hoga to
 *   password generate hoga, aur ye password ko update kar dega, jisse ek
 *   rerender hoga, aur fir same process repeat hoga jisse infinite loop bana
 *   jayega.
 * 
 * Sol: useEffect hook.
*/


function PasswordGenerator() {
  const [password, setPassword] = useState("AHBFHVVRG");
  const [length, setLength] = useState(10);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);


  function generatePassword() {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number) {
      str += "0123456789";
    }
    if(character) {
      str += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    let password = "";
    for(let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }
    setPassword(password);
  };

  useEffect(() => {
    generatePassword();
  }, [length, number, character]);


  return (
    <div>
      <h1> {password} </h1>
      <div className='input-container'>
        {/* Length */}
        <input type="range" min={5} max={50} value={length} onChange={ (e) => setLength(e.target.value) } />
        <label htmlFor="length">Length is: {length}</label>

        {/* Number */}
        <input type="checkbox" defaultChecked={number} onChange={ () => setNumber(!number) } />
        <label htmlFor="number">Number</label>

        {/* Character */}
        <input type="checkbox" defaultChecked={character} onChange={ () => setCharacter(!character) } />
        <label htmlFor="character">Character</label>
      </div>
    </div>
  )
} 


function App() {

  return (
    <div>
      <PasswordGenerator />
    </div>
  )
}

export default App
