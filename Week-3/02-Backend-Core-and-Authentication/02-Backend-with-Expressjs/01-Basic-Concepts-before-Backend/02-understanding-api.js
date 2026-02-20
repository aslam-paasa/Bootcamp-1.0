/**
 * Understanding API:
 * Express.js ek chota sa server software hai jo mere machine m chl rha
 * hai. Mere machine m chlne ka mtlb hai ki mera machine iss building
 * a network se connected hai. Means jo jo log iss building k network
 * m aate hai wo sb log iss server ko access kr skte hai, bss inko meri
 * id pta honi chaiye.
 * 
 * Express.js server code ko maine likha hai, agar mai iss building m
 * kisi ko apni IP Address batau to wo mere iss Server pe request bhj
 * skta hai aur mere ye Exprees.js Server usse response dega.
 * 
 * IP: 192.168.210.35
 * => http://192.168.210.35:3000
 * 
 * Jo v iss building k wifi se connected hai unhe apne browser pe jaa
 * k ye upar ye API likhte hai, to unhe mere iss Express.js ka respone
 * milega i.e. 'Hello World'.
 * 
 * Note: Try this with our phone number.
 * 
 * Q. What do you mean by API?
 * => GUI - Graphical User Interface
 * => UI  - User Interface
 * => Suppose AC ka button daba k humne AC band kiya to wo button User
 *    Interface hai. Agar ek insaan ko iss AC se baat krni hogi ya
 *    iss AC ko instruction deni hogi to wo iss UI ko istemal krega,
 *    aur button daba k apni instruction de dega.
 * => Example of UI:
 *    a. Washing Machine k button dabane se chl jaata h to wo UI h.
 *    b. Microwave k button dabane se chl jaata h to wo UI h.
 *    c. Computer ka UI uska keyboard, screen(touch) and mouse hai.
 *       Means ek insaan k liye bnaya gya machine hai ki app iss machine
 *       se kaise baat kroge.
 * => Example of GUI:
 *    Graphical Version of UI.
 *    a. Mobile Camera capture button: Uss button pe click dabane se
 *       jo click hota hai, wo UI to hai but uska graphical version hai.
 *       Wo koi actual button nhi hai.
 *    b. Close tab of a browser
 * => Example of CLI:
 *    Command Version of UI.
 * => Example of API:
 *    - Application Programming Interface
 *    - Ek machine m jo panel bna hota hai button dabane ka wo hua UI.
 *    - Ek machine m ek dusri machine ki jo panel bna hai wo hota hai
 *      programming interface.
 *    - Suppose AC m jo button lga hai wo hua User Interface, but iska
 *      ek programming interface v hai. AC ka remote ek complete device
 *      hai jiska apna power source, circuit hai, button etc hai, aur
 *      jb mai uska button dabata hu to wo machine kuch kehti hai usse.
 *      Koi aisa interface uss machine m export hua hai jo humein nhi
 *      dikh rha but that interface is for another machine, aur iss
 *      tarah k interface ko hm programming interface kehte hai.
 *      a. Phone and wifi device k bich ek interface bna hua hai jo
 *         communicate krta hai.
 *      b. Wireless Mouse 
 *    - Basically ek device dusre device se baat krta hai over the
 *      internet iss programming interface kehte hai.
*/

/**
 * Q. Iss API ko kn call krega?
*/

const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(3000);


/**
 * => Iss API ko mai call ni krunga, isse call kregi dusri machine like
 *    Browser, Postman etc.
 * => localhost:3000/ -> means mere machine ki jo v IP hai uski baat
 *    ho rhi hai. Har baar mujhe apni IP naa likhni pade isliye hm
 *    locahost likhte hai.
 * Note: Ye API kvi aise call nhi hogi. Mere har API k upar ek button
 *       hoga, jb v search ya button pe kuch kiya jaega tb behind the
 *       scene API call hogi(API-UI Mapping), aur API se jo data aaega 
 *       usse v hm structure kr k dikhaenge.
 * 
 * => We will expose our API from the Server Software, called HTTP API.
 *    And iss API ko over the internet access kiya jaata hai. Jiss kisi
 *    k paas internet hoga wo isse access kr paega. Aur usme address
 *    kya likhega to access? Meri machine ka address.
 * => Aur fir hm dusri machine i.e. machine k andr dusri machine like
 *    Browser or Postman or Mobile se usse access kar paenge.
*/

/**
 * Ye jo humaara backend code hai ye server iss waqt mere machine m
 * chl rha hai, but ultimately ye mere machine m nhi chlgea. Isko hm
 * cloud pe kisi machine m bhjnge qki hm apni machine band krnge to
 * server v shut down ho jaega. VS Code, Terminal etc sb band ho jaega,
 * aur jo koi request bhejega iss API pe wo successful nhi hoga, aur
 * uska error milega.
 * 
 * Issue:
 * 1. 24x7 machine on rkhna hoga to possible nhi hai.
 * 2. Hm jo internet use krte hai wo hota hai Residentil Internet, aur
 *    isme bahut si chije restricted hoti hai. Server k liye humein
 *    saari restrictions hatwani padegi, traffic ki load handle krna
 *    hoga, make sure krna hai light 24x7 hai, Internet speed high rhe 
 *    etc. Aur apne ghr pe server lga rhe hote hai, jaisa humne apne
 *    laptop le lgaya hai, to iss tarah k server ko on-premises server
 *    kehte hai(Qki ghr pe lga hua hai). But this is less popular way,
 *    and expensive.
 *    Solution: Cloud Computing => AWS, GCP etc [More Popular Approach]
 *                   |              |
 *                   V              V
 *              Rented Server/Computer Online
 * 
 * Note: Cloud is on Internet. And Internet is web of connected computers.
*/
