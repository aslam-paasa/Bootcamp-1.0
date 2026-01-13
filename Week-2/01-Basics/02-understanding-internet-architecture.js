/**
 * Q. What is Internet?
 * => Humaare kai saare computer systems hai.
 * => Humaara Computer System duniya m dusre computer system se connect 
 *    ho skta hai. Means mere computer se data hawa m form m bahar jaega
 *    aur ye hawa hoga radiowaves k form m humaare nearest tower tk.
 * => Humaare nearest tower tk jb wo data pahuchega to wo towers humaare
 *    data ko electric signals m convert krnge jo ki zameen k raaste
 *    ISP - Internet Service Provider like Jio, Airtel etc k through
 *    unke main hub tk ye pahuchega, jaha pe ISP check krega ki hum kis
 *    URL ko access krne ki koshish kr rhe hai.
 * => For example, agar hum whatsapp ki URL ko access krne ki koshish
 *    kr rhe hai to ISP check krega kahi wo blacklisted to nhi hai,
 *    aur agar wo blacklisted nhi hai to humaare request ko forward kr dega.
 * => Ab humaara request aage badhega aur aage jaate jaate uss particular
 *    "server" tk pahuchega jis server pr uss request/msg ko jaana chaiye
 *    tha. Aur similarly usi tarah response ghum k humaare laptop tk
 *    wapas aa gya.
 * 
 * 3 main key players:
 * 1. Laptop
 * 2. ISP
 * 3. Server
 * => Aur iss tarike ka network build ko kehte hai INTERNET.
 * 
 * */ 


/**
 * Understanding IP Address: Your device's Internet ID?
 * => Fact: Kisi v computer system/machine ka koi IP Address nhi hota hai.
 * => For example, humaare paas ek phone hai jisse humne Internet se
 *    connect kiya. To internet se connect krne par sirf tb iss device
 *    k paas ek IP Address aaega. Means hum Internet off kr de to
 *    humaare device k paas koi IP Address nhi hoga. 
 * => IP Address humaare device ko ISP deta, jis company ka hum Internet
 *    chla rhe hai like JIO, Airtel etc. 
 * 
 * Q. IP Address kaisa dikhta hai?
 * => Iske 2 variants hai:
 *    (a) Upar side m humein dikhega:
 *        IPv4
 *        66.94.29.13
 * 
 *    (b) Niche side m humein dikhega:
 *        IPv6
 *        2001:0000:3238:DFE1:0063:0000:0000:FEFB
 * 
 * => IPv4 thoda sa easy dikhta wahi IPv6 bada sa aur lamba sa dikhta hai.
 * => Ek company ko kai saare devices ko IP Address dene hote hai, to
 *    JIO ko v saare devices ko IP Address dene honge. Jb ye model bna
 *    to uss waqt m jyda devices nhi thi, to IP Address utne jyda humein
 *    dene nhi hote the aur hm km number m hi IP sbko de dete the. But
 *    devices bahut ho gye hai aur utne IP Address hum allot nhi kr skte
 *    itni saari devices ko tb fir IPv6 market m aata hai.
 * => The address space of IPv6 is quite large, it can produce
 *    3.4 X 1-^38 address space.
 * 
 * Note: IP Address ek device ki pehchan hoti hai Internet pe, aur ye
 *       unique hoti hai jo humein ISP dete hai. Aur ye humein diya
 *       jaata hai ek protocol k through jiska naam hai:
 *       => DHCP: Dynamic Host Configuration Protocol
 * => Aur jb ye IP Address humein milta hai tbhi hum Internet chala 
 *    paate hai aur Internet pe humaari Identity hoti hai.
 * */ 


/**
 * Cracking the Code of MAC Address:
 * => Similar to IP Address jisse ISP deta hai jb hm kisi company ka ISP
 *    use krte hai. Device ka v apne ek physical address hota hai. 
 * => Means actually device k chip m ek address likha jaata hai aur iss
 *    address ka naam MAC Address hai.
 * 
 * Q. Iss address ka pehchan Internet pe hoti hai?
 * => No!, Ye Local Area Network(LAN) m humaari pehchan hoti hai.
 * => Maan lete hai hum apne hostel m baithe hai jaha pe ek router lga
 *    hua hai, aur 5-6 log uss router se connected hai. To iss chote se
 *    area m jo network build hai, to uss chote se area ki humaari
 *    pehchan humaari IP Address nhi hai, humaari pehchan MAC Address hai.
 * => Means router humein MAC Address k through pehchanta hai. Aur
 *    Internet jaisi badi global network m humaari pehchan IP Address hai.
 * 
 * */ 


/**
 * Understanding Proxies - Your gateway to privacy:
 * => Proxy means basically 'A' ko 'B' se baat krni hai to 'A' directly
 *    'B' se baat naa kr k 'C' ko message dega aur wo message 'B' ko
 *    transfer kiya jaega. Aur fir 'B' apna reply 'C' ko dega jo 'A'
 *    ko pahuchaega.
 * => A<--->C<--->B
 * 
 * => Hum apne device ko ye bol skte hai ki usse baat krne k jagha iss
 *    Computer Network se baat kro aur iske through uspe bhejo i.e. Proxy.
 * => Means directly apne server se baat krne k jagha hm kisi aur aur
 *    ko msg de de aur wo server ko msg bhejega. Aur server ko lagega
 *    ko wo msg humne nhi dusre bande ne usse kiya hai i.e. proxy.
 *
 * Q. Why we use Proxy?
 * => Kai baar humein allow nhi kiya jaata hai colleges, schools etc m
 *    specific website ko kholne k liye to hm basically proxy server
 *    waha pe lagaate hai websites ko open krne k liye.
 * => For example, abc.com humein allow nhi kiya gya hai to hum keh
 *    skte hai defg.com open kro, ab defg.com to ban nhi hai to wo
 *    website khul jaega aur jb hum defg.com pe jaenge to humein abc.com
 *    pe le jaega. To technically hum abc.com hi khol rhe hai bass
 *    defg.com pe jaa kr abc.com khol rhe hai.
 * => Koi chij bna h to usse open krne k liye hum proxy use krte hai
 * */ 


/**
 * Exploring VPNs - Your shield in the Digital World:
 * => VPN stands for Virtual Private Network
 * => VPN is very similar to proxy.
 * => It basically means mai apna data kisi aur ko bhejunga, wo apna
 *    data kisi ko bhejega. 
 * => Sounds like Proxy and VPN are same but aisa nhi hai.
 * => Jb hum proxy lagaate hai aur wo data aage bhejta hai to iss Proxy
 *    m case m humaara data encrypted nhi rehta hai. It means ISP
 *    humaara data pdh skta hai, government humaare data ko track kr
 *    k padh skti hai etc.
 * => Lekin jb hum VPN pe baat krte hai tb data encrypted hota hai, 
 *    ISP usse pdh nhi skta, track nhi kr skta.
 * => VPN provide krni wali company yha tk guarantee deti hai ki wo koi
 *    log/track nhi rkhnge ki humne kn kn se website visit kiya. But
 *    iske liye ye charge krti hai.
 * => Isse hum apne pehchan chupa skte hai.
 * */ 


/**
 * Decoding Servers - The heart of the Internet:
 * => Monitor/CPU/Keyboard/Mouse => Ab sochiye humaare iss computer system
 *    pe monitor nhi hai. Ab monitor nhi hai to keyboard ka v kaam nhu 
 *    hai to humne usse v hata diya, aur dono nhi hai to mouse ka v koi
 *    kaam nhi isliye humne mouse v hata diya.
 * => Humaare paas bachta hai sirf CPU.
 * => Server ek computer system hoti hai jo ki programmed hai request
 *    ko accept krne k liye and response ko bhjne k liye.
 * => We can say it like:
 *    (a) Computer System Programmed ho
 *    (b) Connected to Internet ho
 *    (c) Aur File Share kr skta ho
 *    => Isse hum server kehte hai.
 * => Humaara laptop server nhi hai, but agar hum usse aisa programme
 *    kr de ki koi v Internet se aae aur ye 5-6 files tmse maange to
 *    tm usse de dena. Basically humaare laptop server kr rha hai unn
 *    5-6 files ko, to technically humaara laptop ek server hai.
 * => Client normal laptop/mobile/computer etc jo kisi server se jaa k
 *    kuch data laa rha ho.
 * => For example, hum raat m JIO Cinema pe match dekh rhe hai. To 
 *    basically humaara mobile ke Client hai jo Server se data laa rha
 *    hai jaha pe match broadcast ho rha hai.
 * */ 


/**
 * Understanding Reverse Proxies - Your invisible guardian online:
 * => Proxy jo hoti hai to Client side pe hoti hai.
 * => For example, hum proxy set krte hai apne device pe like in mobile
 *    ki data yha se waha bhejna hai.
 * => Similarly, Reverse Proxy server side pe set hoti hai.
 * => Humne Client side se bola ki JIO pe request bhejo. To jo request
 *    hai wo pehle reverse proxy server pe jaegi aur wo reverse proxy
 *    server check krega ki kahi request m koi malicious chij to nhi
 *    hai, baar baar request to nhi bhj rha hai. To rate limiting k
 *    liye mainly hum isse use krte hai.
 * => Humne ek script likhi ki JIO k server pe 1-lakh baar request bhejo.
 *    Itni request krnge to isi ko hm DDos Attack bolta hai aur jisse
 *    server crash ho jaati hai. Aur iss chijo ko handle kr skte hai
 *    rate limiting k through aur jiske help se humaare main server pe
 *    load nhi aaega.
 * => Rate Limiting hm software wise bna skte hai lekin hardware wise
 *    v acche se bna skte hai reverse proxy lga k.
 * */ 


/**
 * Understanding Internet Protocols:
 * => Jb Internet bna to internet hum browser pe chalaate hai like
 *    Chrome, Firefox etc.
 * => Jiss community ne internet bnaya uss company ne socha ki bahut
 *    saari company hai jo browser bnati hai aur sb apne tarike se 
 *    chije handle krne lge to Internet alag alag browsers pe alag alag
 *    tarike se chalne lgega.
 * => To unhone socha ki Internet k proper rules hone chaiye ki agar
 *    aap browser bna rhe hai to usse HTTP follow krna pdega, user ka
 *    IP Address etc dena pdega. So, basically inhone kuch set of rules
 *    bnayi jisse companies ko follow krni pdegi agar user browser chla
 *    rha hai.
 * => Internet chalaane k rules hai
 * => Mail bhejne k rules hai
 * => Files ko download krne k liye rules hai
 * => Basically har chij k liye rules hai, aur inn rules ko hum protocols
 *    kehte hai.
 * 
 * Note: Alag Alag browsers ek hi tarike se chijo ko follow kre iske 
 *       rules bnae gye aur wo rules hai protocols.*/ 


/**
 * ISPs - You gateway to Internet:
 * => ISP stands for Internet Service Provider.
 * => Ye basically wo middle pillar hai jo humein kisi aur se connect
 *    krta hai.
 * => Ye wo log hai jinhone poore duniya ko connect kiya hai.
 * => For example, humne mobile se data bheja aur ye data hawa m 
 *    radiowaves/packets k through nearest tower m jaega. Wo jo tower
 *    lga hai wo ISP ka hai aur wo zameen m wires gyi hai wo v ISP ka
 *    hai. Aur wo jo hub bna hai poore India k network sambhaalne k
 *    liye wo v ISP ka h.
 * => Lekin agar India k data Australia pahuchana hai to air k through
 *    nhi pahucha skte hai, to sea k through wo data pahuchaate hai
 *    bade bade wires k through aur wo paisa v ISP m kharch kiya hai.
 *    That's why they charge us money for mobile or Wifi recharge. 
 * */ 


/**
 * TCP-IP Protocols - Your guide to Internet Communication:
 * => TCP & IP dono alag alag protocols hai.
 * => TCP: Mere saamne ek ldka baitha hai aur mjhe usse baat krni hai.
 *         To main usse ek msg bhjunga "Hey!" aur ye msg jaise hi uske
 *         baas pahuchega to ek acknowledgement bhjna padega means 
 *         pahucha ya nhi pahucha ye btana pdega. Ab mujhe acknowledgement
 *         mil gya ki pahucha gya, to ab ye kuch reply de skta hai aur
 *         mere taraf se usko acknowledgement jaega ki pahuch gya. Aur
 *         ye hui ek cycle complete. This is TCP.
 *         => Jb v hm ek msg bhjte hai to waha pe aata hai sent, to wo
 *            ek acknowledgement hai.
 * 
 * => IP: IP is basically Internet pe humaari pehchan IP Address kehlaata
 *        hai aur IP Protocol k through ye address humein diya jaata hai.
 *        Ye address ISP k through diya jaata hai aur ye poora kaam 
 *        DHCP k through karaya jaata hai. Aur jbtk internet on rhega
 *        tbtk ekhi provided IP Address rhega aur duniya m ye kisi ka
 *        nhi hoga, aur jb internet band kr denge to IP Address release
 *        ho jaega, aur ho skta hai ye same IP Address kisi aur ko mil jae.
 *        Basically means alag alag time pe same IP Address 2 logo ka ho
 *        skta hai. 
 * 
 * Q. To jb companies kisi ko pakadnge aati hai to kaise pakadti hai?
 * => Aisa bola jaata hai ki Thursday night ko 3 bje ye IP kiske paas
 *    tha? Uss time pe to ek k hi paas hoga, to wo banda pakda jaata hai.
 *      
 *             
 * */ 


/**
 * Exploring UDP - Your guide to Internet Speed:
 * => Jb hum koi v streaming services dekhte hai like IPL Live, to waha
 *    pe UDP Protocol use hota hai.
 * => TCP m humne msg bheja "Hi!", to pehle acknowledgement aaya ki
 *    pahuch gya tb uska reply aaega. So, TCP ka kaam hai bhejo fir
 *    acknowledgement milega then wo bhejega aur acknowledgement milega.
 *    Aur yhi cycle chlta rhega.
 * => But UDP is like "Hey!", "Kaise ho?", "Kaisa chl rha hai sb?" etc.
 *    So, UDP is basically like fekte rho data ko and wo check nhi krta
 *    ki pahucha ki nhi pahucha. UDP is basically like agle bande tk
 *    data jitna fast ho skte pahucha do aur ye saari chije streaming
 *    m use hoti hai kyuki kuch scene disturb hua ko koi baat nhi but
 *    match live dikhna chaiye.
 * 
 * Note: 
 * (a) UDP: Jaldi se jaldi data dikhana, but guarantee nhi leta pahucha 
 *          ki nhi, wo agla data bhjte jaega.
 * (b) TDP: Ye pehle ek data bhejega aur fir guarantee dega ki pahucha 
 *          ki nhi, tb wo agla data bhejega. Basically data 2 baar data
 *          aa jaa rha hai.
 * */ 


/**
 * Remember:
 * => HTTP k 3 versions h:
 *    (a) version 1
 *    (b) version 2
 *    (c) version 3
 * 
 * => Version-1: Jb hm version-1 k routers use krte the to ek problem
 *    hoti thi known as conjustion means hm data to bahut teji se 
 *    bhj rhe hai router lekin router uss data ko aage transmit ni
 *    kr paa rha hai, wo dhire dhire transmit ho rha hai. Version-1
 *    is like a single road, based on TCp-IP model only.
 * 
 * => Version-2: This version is more like a 2 way but still bade bade
 *    file speed transfer krne ki advancement version-2 m nhi thi.
 *    Ye v thoda slow ho jaata hai jb hm kaafi saara data bhejte hai,
 *    iss problem k wajah se fir version-3 aaya. Based on TCP-IP model
 *    only.
 * 
 * => Version-3: TCP & UDP, dono hi version-3 m hai aur version-3 
 *    decide krte hai ki kb kn sa use krna hai. Agar hm ek streaming
 *    website chla rhe hai to version-3 m hm UDP Protocol follow kr
 *    rhe hai, but jb hm usi version-3 m aisa file chla rhe hai jisme
 *    ye jaruri hai ki data pahucha ya nhi pahucha, bilkul order m
 *    pahuchna chaiye aur guaranteed waha pahuchna chaiye, tb fir hm
 *    TCP-IP model use krte hai.
 * */ 


/* HTTP - Hyper Text Transfer Protocol :
 - Jb humein kahi text bhejna hota h to uss text ko kaise transfer kiya jaega
   hm bss yhi pdhnge.
 - Bahut saare variables, options hai, optimized tarike se hum transfer krna
   chahte h, to hm koi aisa data structure ka use nhi krna chahte h jo ki
   bahut jyda expensive ho, to yha humari DSA ki knowledge aati h.
 - Ab transferring ka kaam ho rha h to computer m OS hi to ek dusre se baat
   kr rhe h network k upar, to yha networking ka v role aata h. 
 - OS uss data ko rkhega v process krega to OS ki v knowledge yha aati hai.
 
 - Humaare paas 2 chije rahegi - 
  +--------+                +--------+
  |        | -------------->|        |
  | Mobile |                | Server |
  |        |<---------------|        |
  +--------+                +--------+
   Client                     Server
 - Ek humara mobile rhega aur dusra server, aur dono ek dusre se baat krna
   chahta hai. Isi ko bolte h hm "Client" and "Server".
 - Yhi h "Client-Server" model, aur isme dkhnge ye kis tarah se baat krnge
   kaise kaise baat krnge, inhi sb k baare m hm charcha krnge. 
   
 - HTTP k baat kre to usme 2-3 words regular dekhnge ko milnge -
 (a) URL : Kaha pe location h uski 
 (b) URI : Uska identifier kya h
 (c) URN : Uska name kya h
 - In short iska mtlb ye h ki mai kaha pe baat kru, mujhe wo location to do.
   Ab location m jaruri nhi ki jo URL h wo HTTP aae, for example, mongo k case
   m humne dekha tha waha pe SRN, SRV protocols tha. To bahut saare protocols
   hote h communcation krne ka HTTP unme se ek h.

Q) What are HTTP headers?
 - Jaise hi hm HTTP request bhej rhe ho to saath m kuch information bhejni
   padti hai. Jaise hum koi file bhejte h to file k saath v information aati h
   like file ka naam kya h, size kya h, file create kb hui thi, file modify
   kb hui aur inke saath m kuch "META DATA" aata h (data k baare m data) aur
   yhi sb h humaare HTTP headers (metadata).
 - Ye metadata key-value pair m hota h.
   For example, name: Hitesh -> name(key):Hitesh(value). 
 - Yr key-value HTTP k andr bahut jyda open rkhi gyi h. Kuch headers h jo ki
   already defined h ki ye aaega to mai ye expect krta hu lekin hum chahe to khud
   k headers v bna skte h. Aur headers humein request m v milnge aur response m
   v. Jb hm request bhejte h depend krta h kaha se kaise request jaa rhi h to uske
   baare m v kaafi information jaati h ki humne programmatically request bheji h
   ya koi tool use kra h jaise POSTMAN, THUNDER CLIENT aur agar humaare browser
   se bheji h to v ek alag request header jaati h. Aisa h response v hota h, server
   kaise response humaare liye kr rha h, ho skta h server ne humein OK bheja ho,
   ya ho skta h server ne bola ho 404-Not Found, to depend krta h kya values aai h.

 - meta data -> key-value sent along with request & response
 
Q) Headers krti kya hai?
 - Headers k bahut saare kaam hote h like -
 (a) Caching - Ye dekhne k liye ki ye request avi to aai thi to iska koi cache
               database m se koi value utha le agar mil jae to 
 (b) authentication - Authentication bahut jagha use hota h. Iske headers hote h
                      bearer token h kya, session cookie h kya, session value h
                      kya, refresh token h kya. To authentication k liye v kaafi
                      mechanism liye jaate h.
 (c) Manage Start - State Management se mtlb h user ki state kya hai? Kya wo ek
                    guest user hai, kya wo logged in user hai, kya usne already
                    kuch cart m rakh rkha hai, user ki state kis position pe h
                    wo v hum dekhte hai. 
Note : 2012 se pehle se jitne headers hote the sbme "X-prefix" rkhna jaruri hota 
tha. Suppose humne koi name bheja h to "X-Name" rkhna jaruri tha lekin ye "x"
almost "deprecated" ho gya h. Use nhi krne pe koi error nhi aati hai but puraane
codebase m dekhne ko milega.

* Headers ki koi category nhi h but humne khud k liye bna k rkhhi h, aur isme
* dekhnge ki headers kis tarah k hote h -
    1. Request Headers        -> From Client
    2. Response Headers       -> From Server
    3. Representation Headers -> Encoding/compression 
    4. Payload Headers        -> data

1. Request Headers 
 - Inn sb m wo category aati h jo ki Client se jo v data aa rha hai usko hum
   request header bol lete h.

2. Response Headers ""
 - Inn sb m wo category aati h jo ki Server se jo v data aa rha hai usko hum
   response header bol lete h.  
 - Suppose ek server h wo OK k liye 200 code bhej rha h, ek server h wo OK k liye
   code bhej rha h 400, to obvisouly ye standard practice nhi hui aur standard
   code v nhi hua to kuch convention h jo hum lete hai. 

3. Representation Headers : Ye humein btata h ki data humara kis encoding m hai
   ya kis compression m hai. Aage jaa k kuch aise applications handle krnge
   khas kr k mobile applications m jaha pe data humaara compressed format m 
   aata h like "gzip" m aata h to extract krna pdta h fir usko representation
   krna pdta h. Graph Chart agar hm use krnge kvi, aage jaa k kuch applications
   banaenge like Zerodha, RazorPay, waha pe graph chart ka bahut kaam hota h to
   uss tarah m data jydatar hum "Compressed" format m bhejte h qki network ki ek
   limit h ki itna h data bhej skte h wrna lag aane lagega to uss case m hum
   representation header ka use kr k uski "encoding" kya h ye "compression" kya
   hai ye sb dekh lete hai.

4. Payload Headers : Payload fancy naam h data k liye. Jo v humein data bhejna h
   jaise  "_id" ya fir normally kisi ki "id" bhejni h ya fir kisi ka "email"
   bhejna h to colon lga k data bss bhar dena h aur bass wahi payload hota h
   like this "email: aslampaasa420@gmail.com". 

Q) Itne hi type k headers hote h kya?
 - No! Sbke alag alag categorization h. Depend krta h hum kn si book padh rhe h,
   kn se youtuber se pdh rhe h. Iss tarike k kaafi aur header milnge like -
    5. Security

Note : Most Common Headers -
    (a) Accept: application/json
    (b) User-Agent
    (c) Authorization
    (d) Content-Type
    (e) Cookie
    (f) Cache-Control

1. Accept: application/json 
 - Ye sirf ye btata h ki mai kis type ka data accept krne wala hu, mostly
   servers pe hota hai.
 - Aaj k date m "application/json" sbse common dikhega, it means ki mai json
   ka data accept krta hu but sirf aisa nhi h, aur v format h jo accept hota h
   like "text/html" but aaj k date m most common APIs hi banti h to "application/
   json" sbse jyda dikhega.

2. User-Agent :
 - Ye header sirf ye btata h ki kon si application se request aai hai like
   POSTMAN se aai h ye browser ne bheji hai to browser kn sa tha, kn sa engine
   support kr rha tha etc. To "User-Agent" k andr kaafi information mil jaati h
   User ki, aur tabhi tk hum dekhte h ki kuch websites/application hum visit krte
   hai to automatically ek popup de deti h ki aap ne humaari app use kri h aur ye
   sb user agent se nikaala jaata h ki. Agar aap ne humaari browser se humaari
   website visit ki h aur mobile browser se data aa rha h to user ko popup suggest
   kr dete h humaari app download kr lo.
   
3. Authorization :
 - Ye sbse commonly used hai. Agar hum frontend pe kaam kr rhe h to humein
   authorization headers bhejne hote hai.
 - Sbse common hm yha dekhnge to "authorization: beader_______", bearer k saath
   ek long line hoti h code ki. Ye kuch nhi, jb hum bearer token bhejte h JWT
   style mai to isi tarah se bhejte h ki pehle keyword lagaya jaata h "bearer"
   fir uske baad ek space fir "JWT Token".

4. Content-Type :
 - Images, pdf etc kya bhej rhe h wo sb isi m dekha jaata h

5. Cookies :
 - {...} isi tarah se object h waha pe aur values h ki ye wala unique code hai,
   itne time tk ye wala cookie rhegi, itne time tk hum user ko login rkhnge to
   ye sb information cookies m bheji jaati hai.

6. Cache-Control :
 - Data kb expire kr du, data agar network m rehna chah rha h to kitne time baad
   usse expire kr du etc. to ye sb hm cache control m server se kr lete hai.

-> Ye sb the basics, iske baad kuch headers h jo "Production" grade apps m dikhnge
   standard companies m aur kai baar nai v dikhnge -
   (a) CORS
   (b) Security
 - Ye headers apne aap m kuch nhi krti, Companies ki internal policies hoti h
   ki hum kya kya origins allow krne wale h mtlb kaha kaha se request aa skti h
   apni application pe. Hum humaari website allow kr rhe h, app allow kr rhe h,
   aise directly allow ni kr rhe hai. Jaise twitter pe hum dekhnge ki scrapping
   allow nhi hai to wo sb control humne CORS se kr rkha hai ki kn kn se 
   credentials allows h, methods allow hai, hm GET allow krte h but POST allow
   nhi krte hai.
 - Security Policies v hoti h.

CORS :
    (a) Access-Control-Allow-Origin
    (b) Access-Control-Allow-Credentials
    (c) Access-Control-Allow-Methods

Security :
    (a) Cross-Origin-Embedder-Policy
    (b) Cross-Origin-Opener-Policy
    (c) Content-Security-Policy
    (d) X-XSS-Protection

Note : Ye sb header information h, isse automatic kuch nhi hota hai. Humein 
define/code likhna pdta hai ki ye allow kr rkha h apni application mai, ye
meta-data hai isliye mai ye kaam kr du, automatic kuch nhi hota hai.



HTTP Methods :
 - Basic set of operations that can be used to interact with server 
1. GET : Retrieve a resource
2. HEAD : No message body (response headers only) 
3. OPTIONS : What operations are available
4. TRACE : loopback test (get same data)
5. DELETE : remove a resource
6. PUT : replace a resource
7. POST : interact with resource (mostly add)
8. PATCH : change part of a resource

 - Humne agar POSTMAN, THUNDERCLIENT galti se khol liya hoga dropdown k andr
   jaga pe GET likha hota h to waha bahut long list open ho jaati hai, to HTTP
   k andr kaafi methods available ho jaati hai jo hum kaam m le skte hai. Kuch
   common methods h jinke baare m hum baat krnge.
 - Ye methods kuch ni h bss humein btate h ki kya kya performance hm perform kr
   rhe hai. For example, agar mujhe ek data send krna h aur mai chahta hu ki
   database m new entry ho jae to obvious ki baat h ek method h uss kaam k liye.
   Agar mai request kr rha hu server se aur keh rha hu ki mujhe ye data wapas bhej
   do to v ek specific operation h "READ", agar mai chahta h data ka kuch part 
   update krna hai to alg ek operation h aur mai chahta hu ki poora data ek baar
   m update ho jae to uska alag operation hai. To har tarike ka operations humaare
   paas available hote hai, kuch most commonly use hote hai aur kuch nhi v use
   hote hai, kuch v baare m kvi discuss hi nhi hota hai.
 - Most commonly used methods are :
 (a) GET : Retrieve a resource
 (b) POST
 (c) PUT
 (d) DELETE

1. GET : Retrieve a resource
2. HEAD : No message body (response headers only) 
 - Isme body message nhi hota h, sirf headers wapas aate hai.
 - Kaafi baar humein dekhna hota hai User-Agent kya hai ya fir cache-control
   kitna h, to uss cases mai kai baar aise end points banae jaate hai ki sirf
   head hi bhejo.
3. OPTIONS : What operations are available
 - Agar humne end point bna rkha h to Options k andr server se puch skte h ki
   kn kn se Operations available h iss endpoint pe.
 - For example, agar /user h to /user pe humaare POST available h kya, get available
   hai kya, aur kya kya chije h wo mujhe bta do.
 - Bahut kam dekhne ko milega aur automatic kuch nhi hota, humein end points
   banaane hote hai. To GET, PUT, POST, DELETE, ye sb hm apne Controller m bna k
   dekhnge, automatic kuch nhi hota hai. 
4. TRACE : loopback test (get same data)
 - Generally, Debugging k case m use aata hai. Ye loopback deta h means humne jo v
   request bheji h waha se wo response bhej deta hai.
 - Isme kai baar humari resources proxies k piche hota hai, to kn kn si proxies se
   request jaa rhi hai, kn kn se proxies se hote hue request aa rhi hai unke baare
   m humein debugging krni hai ki mujhe response timely nhi mil rha hai, ya jyda
   time lg rha hai to uss case m hum TRACE ko use kr lete hai.
5. DELETE : remove a resource
6. PUT : replace a resource
 - Editing nhi bolnge, actually m poora hi object replace ho jaata hai
7. POST : interact with resource (mostly add)
 - Add value/data
8. PATCH : change part of a resource
 - PATCH k andr sirf uss resource ka particular part hum edit krte hai


HTTP Status Code :
+------------------------------------+
|   1XX ->  Informational            |
|   2XX ->  Success                  |
|   3XX ->  Redirection              |
|   4XX ->  Client Error             |
|   5XX ->  Server Error             |
+------------------------------------+

1.  100 -> Continue
2.  102 -> Processing
3.  200 -> OK
4.  201 -> Created
5.  202 -> Accepted
6.  307 -> Temporary Redirect
7.  308 -> Permanent Redirect
8.  400 -> Bad Request
9.  401 -> Unauthorized
10. 402 -> Payment Required
11. 404 -> Not Found
12. 500 -> Internal Server Error
13. 504 -> Gateway Time Out


 - 1XX wali range generally information pass krne k liye use hoti hai
 - 2XX wali range success k liye use hoti h ki aapne jo data bheja h wo successfully
   humein receive ho gya hai + aap jo operation krna chahte the wo successfully
   complete ho gya hai
 - 3XX wali range direction k liye use hota h means jo v hum resources dekhna
   chah rhe the wo ab remove ho gya hai, ya kahi aur move ho gya hai, temporary
   hua h ya permanent hua h wo depend krta hai alag situation pe. Basically it
   means hm to method/url dekh rhe h ya access kr rhe h wo yha se remove ya kahi
   aur move ho gya hai.
 - 4XX wala jydatar Client Error k liye use hota hai, jaise suppose kariya Client
   ne login krne k koshish kari ya fir koi Operation karne k koshish kar rha h aur
   apna token nahi bheja ya password sahi nahi bheja, so basically means Client
   se information sahi se nahi aayi hai. To agar Client ka koi Error hai to hum
   4XX k saath hm bhjte hai
 - 5XX jydatar server errors m use ki jaati hai, suppose kariya Client ne sahi se
   image bhj di, humne api call kiya, image upload krne k koshish ki, network
   break ho gya, network m traffic jyda hai, congestion jyda hai aur image upload
   nahi ho payi kisi karan se to humari galti h qki Client se nhi hui, usne to
   file bhj di to uss case m hm 5XX use krte hai.


1.  100 -> Continue
2.  102 -> Processing
  - Ho skta hai jyda data bheja ho humne aur time lg rha ho, to mai chahta hu ki
    3 sec baad apne aap user ko ek response to bhj du ki data processing ho rha h.
3.  200 -> OK
4.  201 -> Created
  - Agar resource successfully create ho gya hai jo v hm add krna chahte the DB m
5.  202 -> Accepted
  - Jo data bhej wo maine accept kr liya
6.  307 -> Temporary Redirect
7.  308 -> Permanent Redirect
8.  400 -> Bad Request
9.  401 -> Unauthorized
  - Login to h lekin uss kaam ko krne k liye authorized nhi hai
10. 402 -> Payment Required
  - Payment related request k liye use ki jaati hai
11. 404 -> Not Found
  - Client ne kuch aisi resources access krne ki koshish ki jo h hi nhi
12. 500 -> Internal Server Error
13. 504 -> Gateway Time Out

Note : Ab iska backend se kaha relation h kaha nhi ye baad m dekhnge.
    */ 