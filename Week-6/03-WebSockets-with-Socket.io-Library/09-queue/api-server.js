/**
 * Microservices Communication:
 * 1. Synchronous Communication:
 *    a. API Call: HTTP/HTTPS
 * 
 *                         req
 *       +-----------+ ------------> +-----------+
 *       | Service 1 |     wait      | Service 2 |
 *       +-----------+ <------------ +-----------+
 *                         res
 * 
 * 
 * 2. Asynchronous Communication:
 *    a. Queue:
 * 
 *       +---------------------------------------+
 *       |            Message Broker             |
 *       +----+----------------------------+-----+
 *            |                            |
 *            | Message                    | Message
 *       +----+------+               +-----+-----+
 *       | Service 1 |               | Service 2 |
 *       +-----------+               +-----------+
 *                                    
*/

/**
 * Queue & Fanout:
 * Let's say humaare paas ek API Server hai, jiska kaam sirf incoming req
 * ko handle karna hota hai, and all these server sit behind load balancer.
 * 
 *    +------+     +------+     +------+     +------+
 *    |Server|---->|Server|---->|Server|---->|Server|
 *    +------+     +------+     +------+     +------+
 *        +            +            +            +
 *        |            |            |            |
 *        +            +            +            +
 *    +---------------------------------------------+
 *    |                 Load Balancer               |
 *    +---------------------------------------------+
 * 
 * And because they are sitting behind load balancer, request inme 
 * automatically distributed hote rahengi. Har balancing ki apni apni
 * algorithms hoti hai like:
 * a. Round Robin
 * b. Sticky Sessions
 * c. Weighted Round Robin
 * etc...
 * 
 * User talks to API Gateway, and API Gateway internally routes the request
 * to the load balancer.
 * 
 * Suppose mere pass ek video processor machine hai jisko capacity hai ki 
 * wo at a time sirf ek single video ko process kar sakta hai, and user-1
 * ne humein koi request serve ki like mere liye ek video ko process karo,
 * and video processing takes time to process jiska koi URL hoga like
 * video-service.com. To mere Server ne internally ek API call kr di
 * video-server.com ko ki iss video ko process karna start kar do, aur
 * process start kar dega. Ab user-2 ne ek request kari ki mere liye ek
 * video process karna start karo, but iss time pe ye server free nhi hai,
 * to ye request reject ho jaegi, and isse mere data (video URL) lost ho
 * gyi, and user-2 fir se try krte rhega ki ab process ho paega, and 
 * technically ye har baar reject karta rahega.
 * 
 * Mai chahta hu ki jab video process ho jae to user ko ek email notification
 * & ek whatsapp notification jae ki "You video has been processed". Ab let's
 * say humaare paas ek email server is running & ek aur server hai which is
 * whatsapp processor, aur inki v apni apni kuch URL hogi.
 * 
 * Ab jab mera video process ho jaega to ye ek API call karega email server
 * ko to send an email & aur ek API call karega whatsapp processor ko to
 * send a whatsapp notification. So, can I say that ki ye system complete
 * ho gya hai? Yes! But the issue is ki ye sirf ek user k liye kaam karega,
 * and dusre user k liye fatt jaega kyuki ye user-2 ki request accept nhi
 * karega.
 * 
 * Agar humne multiple video processor banai and let's say email processor
 * gmail ki server use kar rha hai & obviously gmail k server k upar kuch
 * rate limiting v lagi hogi like 1 email/s, but by chance teeno video
 * processor ki video same time pe process hui to ye teeno isko email API
 * ko call karega jisse hoga ye ki gmail humein block kar dega, and suppose
 * humne ye architecture couple kar diya ki this service depends on this
 * service now, and agar ye service down hai to ye API kabhi establish nhi
 * ho paega, and humne ye saara ek mesh bana diya. 
 * 
 * The problem here is ki agar kal ko humein user ko ek sms v send karna hai 
 * to pehle to hum ek sms system setup karnge, fir saare video processor m 
 * jaa k code v change karnge ki ab mere paas ek sms system v hai, isse
 * mere system bahut jyda couple ho chuka hai (means tightly depends on
 * each other), jiske wajah se ek simple service ko add karne m uske piche
 * k saare services ko v update karna pad rha, jiske wajah se ye independently
 * v kaam nhi kr skti, which is not a good practice. 
 * 
 * Ab microservices aapas m communicate kare to kare kaise?
 * Sol-1: Every service will API call to other service. (Overhead, not recommended)
 * Sol-2: Use Queue to decouple the services. (Loosely Coupled - Recommended)
*/

/**
 * Hum ek queue banaenge, aur har queue ka ek naam hota hai like video-request.
 * Humein koi matlab nhi hai ki video processor chl rha hai ya nhi chl rha
 * hai, busy hai, kon ka URL hai, humaare API Server k paas jo v request aaegi
 * hum bas validate karnge aur queue m fekte rhnge, aur humein kisi chij ki
 * worry nhi karni. So, first part decouple ho gya, means mere server can
 * now independently scale, and inko kaam hai bas request ko validate kar k
 * queue m fekna.
 * 
 * Fir maine video processor service ko bola ki tumhein iss queue ko watch
 * karna hai. Ab iss queue m data kaha se aa rha hai tumko matlab nhi hai.
 * 
 * Aur jab video processor service ka kaam ho jaega to ye ek aur queue hai 
 * called video-finished, usme message daal dega ki maine iss video ko
 * finish kr diya hai.
 * 
 * Maine iss video-finished queue k upar ek server laga diya jo isko listen
 * karega, and this server acts as a Router.
 * 
 * Mere email server k ek email-queue hai jisko wo listen karega, aur maine
 * kaha agar tere queue pe koi v message aaye to tumhein usse email kar
 * dena hai + Aisa ho sakta hai ki email queue m million messages pade hai
 * lekin gmail humein 10email/s se jyda allow nhi karega. To main bole ki
 * tu 10 email/s bhej aur apne aap ko kuch der k liye rok le, basically act
 * as a bottle neck here.
 * 
 * Similarly maine ek aur queue bana diya jo whatsapp k liye kaam kr rha hai
 * and ek sms k liye banaya.
 * 
 * Ab maine bass iss Router ko bola ki agar koi v video finished hoti hai
 * to Router niche k teeno queue m notifiy kar dega, Router ko matlab nhi
 * hai ki niche ki queue kaise work karegi, servers kaise work karnge humein
 * bass infor niche pass karna hai. And this is our decoupled architecture
 * and every service can now scale independently.
*/

/**
 * 1. Jo server mere queue k andr message send krta hai usse hum publisher
 *    kehte hai, 
 * 
 * 2. Jo queue se message pull karta hai usse hum worker kehte hai.
 * 
 * 3. Queue k andr k ek message ko message/jobs kehte hai. 
 * 
 * Ek queue k andr message enqueue karna is a straight forward process, but
 * how to gives this message to worker? 
 * - There are multiple ways to do this:
 *   a. Pull mechanism: Worker khud pull karega message ko, means worker is
 *      saying ki "Kuch aaya? Kuch aaya?", agar aaya to pull karlo. So, iss
 *      case m worker decide karta hai ki mujhe kab pick karna hai.
 *      Ex: Polling
 *   b. Push mechanism: Queue k andr intelligent system hota hai jo decide
 *      karta hai ki kis worker ko message send karna hai. So, queue decides
 *      kis worker ko wo message dena hai. [Queue decides] (Recommended)
 *      Ex: AWS SQS (Simple Queue Service), RabbitMQ, Kafka etc.
*/


/**
 * When should be use push mechanism & when to use pull mechanism?

 * - Jaha pe server control kar pae ki usse kis rate se pull karna hai
 *   waha pe pull mechanism use karnge.
 * - Jaha par rate limiting hai aur aap control lena chahte ho ki mai avi
 *   message pull karunga, fir next message 2 hr baad pull karunga, ab mai
 *   agle 15 min kaam nhi karunga, waha pe hum pull mechanism use karege.
 * 
 * - Jaha pe jaise hi message aaye to usko process karna start karo, waha
 *   pe hum push mechanism use karege. Jaha chote chote real time tasks
 *   hote hai waha pe hum push mechanism use karege.
*/


/**
 * Fanout Architecture:
 * 
 *                                                   +-------------+
 *                                            +----->|             |
 *                                            |      +-------------+
 *  +-----------+         +-----------+       |      +-------------+  
 *  |           |-------->|    SNS    |-------+----->|             | 
 *  +-----------+         +-----------+       |      +-------------+
 *                                            |      +-------------+
 *                                            +----->|             |
 *                                                   +-------------+
 * 
 * One message converting to multiple messages are called fanout. Ab iss
 * bich wale part m hum configuration lga sakte hai ki agar user premium
 * hai tabhi mail bhejna. Amazon call this architecture as SNS (Simple
 * Notification Service).
 * 
 * 1. Jab ek message multiple logo ko milta hai to usse Pub-Sub kehte hai.
 * 2. Jab ek message kisi ek user ko milta hai to usse Queue kehte hai.
*/


/**
 * Redis as a Message Broker:
 * Now we need a broker for a queue which will acts as a medium in between
 * and stores the messages. So, we will use Redis as a broker.
 * 
 * Kya redis ek queue hai?
 * - No! But using the data structure we can create a queue on top of redis,
 *   and use liye humaare paas ek package hai called bullmq.
 * - It is a library which helps us to create a queue on top of redis.
 *   Means data ko hum redis m store karte hai but all the list management
 *   system is created & managed by bullmq as a layer over redis.
*/


/**
 * Commands:
 * 1. npm init -y
 * 2. npm i @types/node @types/express@4.x -D
 * 3. npm i express@4.x
 * 4. npm i zod
 * 5. npm i bullmq
*/


import express from "express";
import { z } from "zod";
import { videoProcessingQueue } from "./queues/queue.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

/**
 * 1. Create Schema for Video Processing Pipeline:
 * - z.object ko jab hum call karnge to ye humein ek video URL dega jiska
 *   type string hoga. Aur ye mai expect karunga mere req.body m.
*/
const requestVideoPostRequestSchema = z.object({
    videoUrl: z.string()
});


app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'Hello World' });
});


/**
 * 2. Validate the request body:
 *    a. Input is coming from the client.
 *    b. We need to validate the input.
 *    c. If the input is not valid: send error response to the client.
 *    d. If input is valid then:
 *       - process the video
 *       - import videoProcessingQueue from queue.js file
 *       - add video to queue:
 *         - use videoProcessingQueue.add(jobName, jobData)
 *           - jobName: give unique name for each video (like video-123, video-456 etc.)
 *           - jobData: video details like URL etc that we need to process later
 *       - send success response and jobId (auto generated by bullmq)
*/
app.post('/video-process', async (req, res) => {
    const validationResult = await requestVideoPostRequestSchema.safeParseAsync(req.body);

    if (validationResult.error) {
        return res.status(400).json({ status: 'error', message: validationResult.error.message });
    }

    const { videoUrl } = validationResult.data;

    const job = await videoProcessingQueue.add(`video-${videoUrl}`, { videoUrl });

    res.json({ status: 'enqueued', jobId: job.id });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/**
 * 3. Run the redis on docker, bullmq will connect to redis automatically.
 *    Note: No need to install redis on local machine.
*/



/**
 * 4. Request:
 * POST /video-process
 * 
 * Input:
 * {
 *  "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 * }
 * 
 * Output:
 * {
 *  "status": "enqueued",
 *  "jobId": "1"
 * }
 * 
 * => They are stuck to the queue and stored in redis. But currently no
 *    worker is listening to the queue.
*/