/**
 * Understanding Internet Communication:
 * - Internet pehle military use k liye ek communication system bnaya 
 *   gya tha, baad m usse commercialised kr k paise banae gae, fir wo
 *   ek revolution bn gya.
 * 
 * 1. Early Internet:
 * - Ek bande ko maine gali k ek kone k khada kiya aur dusri gali m
 *   mai khada ho gya. Ab mai usko bolta hu ki agar mai aise ek ungli
 *   ka ishaara karu to iska mtlb hai mujhe paani chaiye, aur do ungli
 *   ka ishaara karu to iska mtlb hai mujhe khana chaiye. Ye baat usko
 *   smjh aa gyi qki pehle se humne ye rule set kiya hai ki ek ungli
 *   ka kya mtlb hai aur 2 ungli ka kya mtlb hai.
 * - Mere se uss tak ye baat kaise pahuchegi? Usne mujhe dekha aur usse
 *   smjh aa gya. And this is Internet.
 * 
 * - Ab mere dost mujhese bahut dur hai, aur wo mujhe dikh ni rha.
 *   To maine ek bijli ki wire kheechi. Maine apne paas lagaya ek
 *   button, aur maine rule set kra ki agar main iska ek baar blink
 *   karaunga to iska mtlb hai mujhe paani chaiye, aur dusri baar
 *   blink karunga to iska mtlb hai mujhe khana chaiye. Blink kr k
 *   maine ek msg bhj diya/bulb ki batti jala k bhujha di to meri
 *   communication ho gyi, aur iss bulb ON/OFF krne ko bolte hai
 *   current. [Low-High Volt] 
 * 
 * - Ab iss communication ko mujhe scaleup krna hai.
 * 
 * - Maine ek button lagaya aur dusre side batti jalti hai, aur ab
 *   uske paas ek batti laga di jisse mere paas ek batti jalti hai,
 *   means this time maine 2 wires khich li, ek mere se uss tk, aur 
 *   ek usse mere tk.
 * - Pehle maine ek baar dabaya to mai bol rha tha ki mujhe paani 
 *   chaiye, aur wo waha se nal khol rha tha to mere paas paani aa
 *   jaa rha tha. Lekin usse agar ye kehna hai ki paani nhi hai to
 *   wo teen baar blink krega bulb ko, aur usse mai ye smjh jaunga 
 *   ki paani nhi hai.
 * 
 * - Ye jo aapas m humne communication ka rules bnaya hai usse hm
 *   kehte hai 'Protocol'.
 * 
 * - 1 morcha aage hai jo border k paas ladai kr rhi hai, aur ek mai
 *   baitha hu piche wale morcha mai. Ab humaare paas wahi setup hai
 *   ki ek button yha se jalata hu to light jalti hai aur button ko
 *   mai off krta hu to light off ho jaati hai, aur ek button waha h,
 *   to hm back-and-forth communication kr skte hai.
 * - Agar mai 4 baar bulb ko blink krta hu to uska mtlb hai ki mai
 *   status puch rha hu. Aur maine ye rules pehle hi setup kr rha hai
 *   ki status agar okay hai to ek baar bass blink kr dena hai. Agar
 *   2 baar blink kiya to halki firing chl rhi hai. To 1-5 tk maine
 *   range bna diya, aur agar 5 aaya to bomb se avi bacha hu, aur
 *   casualities bahut high hai. But agar jawab ni aaya to saare mar
 *   chuke hai.
 * - Note: Communication ki saari power iss ON/OFF par hai. Aur iss
 *         ON/OFF ko hm current bolte hai. Agar Internet ki wires ko
 *         hm bulb pe lagaenge to wo ON/OFF hoga.
 * 
 * - Pehle humaare paas internet ki jo cable lgti thi wo WIFI ye RJ25
 *   cable lgti thi. Bijli ki wire se data bhjne m problem ye tha ki
 *   jb lambi wire ho jaati hai to voltage thoda down ho jaata hai, 
 *   jisko boost krne k liye Transformer lgana pdta hai or Internet
 *   k case m switch lgana pdta hai known as RJ45 jo current ko boost
 *   krta hai.
 * - But ab new way aa gya hai data bhjne ka called Fibre Optics Cable.
 *   Iss Cable k andr roshni hoti hai. Humaare computer se data router
 *   m jaata hai to router usse convert krta hai light m, but hai wahi
 *   0-1.
 * - Fiber Optic cable glass ki patli cable hoti hai, aur uss cable ko
 *   kuch iss tarah se design kiya jaata hai ki wire agar mudd jaati h
 *   to light uske saath mud jaati hai. It means mere paas agar 2 km ki
 *   wire hai, aur wo wire k iss hisse se torch maarta hu to agle kone
 *   m mujhe uss wire se roshni aate hue dikhega. Aur yhi benefit 
 *   fiber Optic ka hai, light instant & long distance cover krta hai,
 *   to isse jldi jldi boost ni krna pdta, kaafi distance m boost kiya
 *   jaata hai. 
 * 
 * - Humaari communication evolve hona start ho gyi hai. Aur ab humein
 *   apni communication ko leke jaana hai next level par.
 * 
 * - Mere paas ek fiber optic cable hai aur mere paas ek number hai
 *   '76', usse one end to other bhjna hai, aur protocols maine pehle
 *   se set kiye hue hai ki ek blink means water, 2-blink means food,
 *   ab teesra data '76' bhjna hai to kaise bhjnge?
 * - Binary m convert kr k ab mere paas 6-digit ka 0-1 to aa gya,
 *   isse kaise distinguish krega saamne wale banda ko? Internet m
 *   iski setting time-divison se ki jaati hai. For example, 1sec = 1T,
 *   aur har guzarta hue second ek data consider hota hai. It means ki
 *   agar iss system k though mai data bhjta hu to ek baar ON-OF krne
 *   ka mtlb h ki 1-sec tk mujhe usse ON rkhna hoga fir OFF krna hoga,
 *   tb jaake wo count hoga.
 * - 1sec ON - water
 *   2sec ON - food
 * - Ye 6-digit ka jo 0-1 bhejna hai usse hm kehte hai 'data packets'. 
 *   But ise hum aise nhi bhjnge. Data Packet jo hm bnaenge uske andr
 *   hm rkhnge ek header. 
 * 
 * Q. What is header?
 *  - Maine ye 1-blink, 2-blink khtm kr diya. Ab mai iss Protocol ko
 *    re-write kr rha hu.
 * - Ab mai ye keh rha hu ki agar maine usse ek second tk ON kr k rkha
 *   to it means ki mai koi general conversation krna chah rha hu like
 *   water, food etc. Lekin maine 2 baar usse blink kiya (2-sec) to it
 *   means ki mai ek number bhjunga. Aur maine agar usse 3-sec tk usse
 *   ON kr k rkha to mai jo agli baar bhjunga wo ek string bhjunga. 
 *   Agar maine usse 4-sec tk ON rkha to audio file bhjunga. Agar maine
 *   5-sec tk ON rkha to img file bhjunga. To maine ye protocol set
 *   kr liya.
 * - Ab isse ek banda observe kr rha hota hai. Ab wo 1-sec tk ON hua
 *   aur OFF ho gya, to baithe hue banda ko pta chl jaega ki general
 *   conversation hone wali hai.
 * - Ab Binary kaise bhjnge? 1sec is 1T. Agar mere binary digit m agar
 *   1st digit agar 1 hai to mai 1-sec tk ON rkhunga, uske baad two 0's 
 *   hai, to mai 2-sec tk OFF rkhunga, fir two 1's hai to mai 2-sec tk ON
 *   rkhunga, fir aakhri 0 hai to mai OFF rkhunga.
 * - Ab header kya hai? Internet ki wire sirf ON-OFF ho rha hai. Mujhe
 *   pehle btana pdega ki mai kya bhj rha hu, tabhi to aage wala expect
 *   krega ki ye chij aa rhi hai qki wire m digit, img, audio, string etc
 *   sb jaa rhi hai.
 * 
 * Q. Mai 1T = 1sec keh rha hu, to maine apne system m 1sec m kitna data
 *    bhj rha hu?
 * => 1sec m 1bit data bhj rha hu(ON-OFF).
 * 
 * Q. Agar mujhe 1/2 sec ki jarurat hai to kya krnge?
 * => 1/2 sec ON-OFF krnge to meri speed double ho jaegi. And new speed
 *    becomes 2-bit per second.
 * => Suppose humaare internet ki speed aaj hai 25mbps. Iss ye pta chlta
 *    hai ki humaara ON-OFF kitna fast hai. Lekin at the end ho yhi rha
 *    hai : ON-OFF, iske alawa koi dusri chij nhi ho rhi.
 * 
 * Note: Jb v mai data packets bhjunga to usse pehle header bhjunga fir
 *       data bhjunga. Poora packet asal m "header + body" hota hai.
 *       But remember, packet itself koi chij nhi hoti, but ek conceptual
 *       thing hai.
 * 
 * Q. Avi tk time ka header m kya hai?
 * => Data Packet jo wire se sbse pehle aaegi usme hm sbse pehle pdhnge
 *    header. Header k andr ek code hota hai jo btate hai:
 * => a. Data kis type ka aa rha hai
 *    b. Iss data ki length kitni hai(taaki wo uski utni hi der tk
 *       pakad k rkhega qki uske baad turant agla packet aa rha hai.
 *       Billions packet isi tarah aa aur jaa rhe hote h ekhi wire m
 *       aur ye saara Network Engineering field m cover hota hai).
 * 
 * Webserver k case m 2 software aaps m baat kr rhe hai. 
 *    Fontend<=====>Backend
 * Mere frontend se jb ek request jaegi mere server pe to uss request
 * ki structure kaise hoga? Wo kis type ki request hogi? Uss request
 * ki 2 part hogi:
 * a. Head
 * b. Body
 * 
 *  - Head m ye likha hoga ki ye request kiss type ki hai.
 *  - Dusra ye likha hoga ki jo mai body bhj rha hu like JSON, XML, 
 *    Text etc. uska size kya hai? bit or kb?
 *  - Teesri chij ye likhi hui hogi ki ye request kis type ki hai:
 *    a. GET
 *    b. POST
 *    c. PUT
 *    d. DELETE
 * 
 * Note: Response m v head + body hi aaega. 
 * 
 * - Jb request mere frontend se nikalti hai to header m apne saath ek 
 *   routing table le k chlti hai jo shortest route find krne k help
 *   krti hai. Ye routing k through submarine cable tk jaati hai fir
 *   waha se server tk, aur header m routing table le k chlti hai qki
 *   destination tk jaana hai aur usi direction se wapas response le k
 *   aana hai.
 * - Request m status code hoga jo indicate krega ki humaari request
 *   successful rhi ya fail ho gyi.
 * - Fir Response ki jo body hai usme koi data aaya v hai, aur agar
 *   aaya hai to uski length kitni hai aur uska type kya hai? JSON
 *   response hai ya XML response h ye text response etc.
*/

/**
 * Iss API m maine khud se header nhi bnaya hai. Header k andr jo v
 * baatein likhi hoti hai wo mera Server S/w khud bna dega.
*/

app.get('/profile', (req, res) => {
    console.log('this is weather');
    res.send({
        city: 'Beijing',
        tempIn: '30C',
        humidity: 56,
        high: 32,
        low: 18
    })
})

/**
 * 1. npm start
 * 2. localhost:3000/weather
 *      {
 *         "city":"Beijing",
 *         "tempInC":30,
 *         "humidity":56,
 *         "high":32,
 *         "low":18
 *      }
 * 
*/