/**
 * Evolution of Backend from beginning till today:
 * 
 * 1. Centralized:
 *    a. Manual Methods          [Primitive Technology]
 *    b. Mechanical Systems      [Primitive Technology]
 *    c. Punched Card Processing [Primitive Technology]
 *    d. Mainframe Computers     [Primitive Technology]
 * 
 * 2. Decentralized:
 *    a. Client-Server Architecture
 *    b. Distributed Computing & Cloud Computing
*/

/**
 * Evolution of Server:
 * 1. Manual Calculation & Physical Transport (Pre-1900s):
 *    > 1900s se pehle, zyadatar backend processing manual hoti thi. 
 *      Jaise agar kisi bank ko accounts manage karne hain, to wo sab
 *      accounts aur transactions ko manually logbook me likhte the.
 *    > Calculation aur data processing ke liye clerks aur human
 *      computers (log jo manually calculation karte the) use hote the.
 *    > Ye manual process slow aur error-prone tha, aur large scale 
 *      data ko handle karna mushkil tha.
 *    > Distance: Limited to local, regional, or internation postal
 *      services.
 *    > Method: Physical documents, or records transport via horse, ship
 *      or trains.
 *    > Transfer Time: Days, Weeks, Even Months depending on the distance.
 *    > Limitations: Time Consuming, unreliable, and distance badhne par
 *      time aur resources v badhte the.
 * 
 * 2. Mechanical Calculators/Telegraph and Morse Code(1830s-1900):
 *    > 19th century me Charles Babbage aur kuch aur scientists ne
 *      mechanical calculators aur analytical engine jaise machines
 *      design kiye jo limited mathematical operations ko automate 
 *      kar sake.
 *    > Inhe backend data processing me use kiya jata tha, jaise census
 *      ya tax calculations me. Lekin inka bhi kaafi limited scope tha.
 *    > Data Range: Per minute roughly 5-10 calculations.
 *    > Distance: Initially local cities and regions tak, later inter-
 *      -continental with undersea cables.
 *    > Example: By the 1860s, transatlantic cables ne Europe aur America
 *      k beech data transfer possible banaya.
 *    > Transfer-Time: Almost real-time, lekin limited to short text msgs.
 *    > Limitations: Sirf basic information exchange possible tha. Large
 *      files ya complex data bhejna impossible tha.
 * 
 * 3. Punched Card Systems(Early 1900s-1950s):
 *    > 1890s me, Herman Hollerith ne punched card system ka avishkar kiya,
 *      jo data ko process karne me kaafi helpful raha. US Census Bureau
 *      ne 1890 ke census ke liye is technology ka use kiya.
 *    > Punched card system me data ko cards par encode kiya jata tha
 *      (chhote chhote holes punch karke), aur ye cards kisi machine me
 *      daalkar read kiye jate.
 *    > Ye punched card readers aur tabulating machines backend processing
 *      me kaafi madadgar bane. Data ko fast process aur store karna 
 *      asaan ho gaya, lekin ye bhi aaj ke computers jitna efficient nahi
 *      tha.
 *    > Data Range: 50-80 cards per minute, ek card lagbhag 80 characters
 *      tk data store ho skta tha.
 *    > Distance: Local only, as cards ko physically ek jagha se dusri 
 *      jagha le jaana pdta tha.
 *    > Method: Physical Transfer within the same building ya city.
 *    > Limitations: Punched cards ko manually transfer krna pdta tha.
 *      Long distance par iska koi feasible method nhi tha, so global
 *      transfer impossible tha.
 *     
 * 
 * 4. Electro-Mechanical Machines or Early Network(1930s-1950s):
 *    > 1930s aur 1940s me electro-mechanical machines develop hui jo 
 *      punched card aur relay technology ka use karke thodi aur complex
 *      processing kar sakti thi.
 *    > Example: Harvard Mark I aur Bombe (jisse WWII ke dauran 
 *      codebreaking me use kiya gaya). In machines ka kaam backend 
 *      processing me help karna tha, lekin ye ab bhi kaafi slow aur 
 *      limited thi.
 *    > Data Range: 100-150 characters per second.
 *    > Distance: Still local, within an office building or between
 *      nearby buildings.
 *    > Example Machines: Havard Mark-I, jo mostly local hi thi aur kaafi
 *      limited range thi.
 *    > Limitations: Data ko physically nearby systems tk hi bheja ja
 *      skta tha. Larger distances k liye manual transportation ya
 *      telegram systems ka use hota.
 * 
 * 5. Mainframe Technology(1950s-1970s):
 *    > Mainframe ka mtlb hota hai ek aisa bada sa powerful computer system
 *      jo large scale par data processing aur transaction handling kar
 *      sake. Ye mostly bade organizations jaise banks, government agencies
 *      aur corporations me use hota tha jaha par large scale data proces
 *      aur store hoti thi.
 *    > In 1940s-1950s me jb computer naye naye aae the, tb kuch bade aur
 *      reliable machines banayi gyi thi.
 *    > UNIVAC aur IBM Systems/360 jaise mainframe systems launch kiye
 *      gye aur jo large data efficiently process aur manage kr ske.
 *    > Inka use banks aur research insititues m hota tha, aur inhe
 *      centralized locations m install kiya jaata tha.
 *    > Ye bahut costly hote the aur ek hi jagha par limited access k
 *      saath available the, mostly terminals se connect hoti thi.
 *    > Terminals ek tarah ka dumb devices the jo user ki input ko mainframe
 *      tk bhejta aur mainframe se data ko access krte the. Processing saari
 *      mainframe par hoti thi, terminals ka sirf input-output ka role
 *      hota tha.
 *    > Mainframe ek highly stable aur robust system tha jo data processing
 *      aur multitasking me excel karta tha, lekin isse remote ye 
 *      decentralized use k liye design nhi kiya gya tha.
 *    > Cost: Mainframe bnane aur maintain krna kaafi costly tha. Sirf
 *      bade organization aur government agencies hi afford kr skti thi.
 *    > Centralized System: Saara processing ek hi central mainframe system
 *      pe hota tha, jo kisi ek location par available hota tha. Har jagha
 *      se directly access nhi kiya jaa skta tha.
 *    > Scalability Issues: Jaise Jaise Organizations aur data requirements
 *      badhne lagi, mainframe ki scalability aur flexibility m limitations
 *      saamne aane lagi.
 * 
 * 
 * 5. Decentralized Client-Server Model:
 *    > 1980s ke aas paas computing requirements badhne lagi, aur saath 
 *      hi, users ka need bhi badh gaya ki wo apne PCs ya client machines
 *      par bhi data ko access aur process kar sakein.
 *    > Centralized mainframe se independent systems ka idea aaya, jo 
 *      decentralized aur flexible ho aur jo data ko alag alag jagah se
 *      access kar sakein.
 *    > Client-server architecture is demand ko fulfill kar sakta tha 
 *      jisme "Client" (user's computer) aur "Server" (backend machine) 
 *      communicate karke data exchange aur processing kar sakte hain.
*/


/** 
 * Server is hardware, software, or both?
 * > Server ka matlab hota hai 'koi jo saamne se serve karta hai' - 
 *   yaani, ek aisi cheez jo kisi user ki request ka jawab de. 
 *   Jaise hum kisi restaurant mein jaate hain, to wahan ka waiter humari 
 *   request pe serve karta hai. Same way, computer network mein bhi 
 *   server requests ko handle karta hai.
 * 
 * > Technically speaking, a server is a software program. Is software ka
 *   kaam hota hai client ya user ki taraf se aayi request ko receive karna
 *   aur uska jawab dena. Jaise web server, email server, file server, etc.
 *   Server kisi bhi machine pe install ho sakta hai, even on a personal computer.
 * 
 * > Lekin practical use mein, server ko kaam karte waqt power aur high
 *   resources chahiye hote hain kyunki uspar bahut saari requests ek saath
 *   aa sakti hain aur server kaafi load handle karta hai. Is wajah se 
 *   logo ko laga ki ek powerful machine ki zaroorat hogi jo is server
 *   software ko smoothly run kar sake.
 * 
 * > IBM aur kuch aur companies ne, jo hardware banati hain, ye dekha ki
 *   logon ko ek reliable aur robust machine chahiye jo 24x7 chale, taaki
 *   server bina rukavat ke kaam kare. To unhone powerful hardware
 *   machines banayi jo continuously chal sakein aur unhe "Server Machine"
 *   ya "Server Hardware" naam de diya. Yeh machine special design hoti thi 
 *   taaki wo zyada time tak chalti rahe aur requests handle kar sake.
 * 
 * > Ye server machines normal computers se alag hote hain kyunki ye extra
 *   power, cooling aur stability ke saath banayi jati hain. Jaise kuch
 *   desktop computers ko lagataar 24 ghante chalana mushkil ho sakta hai,
 *   lekin server hardware ka kaam hi yeh hota hai ki wo 24x7 chale.
 * 
 * > Yeh "Server Hardware" concept ko dekhte hue, developers aur bade
 *   organizations ne apne kaam ke liye aise hi powerful aur reliable
 *   machines lena shuru kiya jo lambay samay tak load handle kar sakti hain.
 *   Lekin is hardware ki power requirement zyada hoti hai aur yeh costly bhi
 *   ho sakti hain, isi wajah se ye "power hungry" bhi hoti hain.
 * 
 * So, a server can refer to the software program, but in practice, the
 * term "server" often also means a powerful machine specifically designed
 * to run server software smoothly.
 */
