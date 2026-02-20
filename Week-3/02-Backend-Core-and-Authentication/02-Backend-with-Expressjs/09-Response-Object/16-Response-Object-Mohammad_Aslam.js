/**
 * Ways of output in a server: [JSON vs XML]
 * Q. What is Data Interchange Language?
 *  - It is a language that is domain-independent and can used for
 *    data transfer from any kind of discipline.
 *  - Example: [Popular]
 *    a. RDF
 *    b. XML
 *    c. Atom
 *    d. JSON
 *    e. YAML
 *    f. REBOL
 *    g. Gellish
 * 
 * - Hum jo HTML k pages likhte hai wo asal m XML hai. Means wo poora
 *   XML ka syntax hai like tag, attributes etc.
 * 
 * - Internet se jo communication ho rhi hai, usme header & body hai.
 *   Aur ye header & body poora mila k ek packet hai.
 * - Ab header m top pe maine likh diya ki jo header aa rha hai wo
 *   XML aa rha hai, aur body to string text hai, usse to pta hi nhi
 *   hai ki wo XML h ya JSON hai.
 * - Usne header dekha to usme XML diya hai, fir usne length dekhi.
 *   Ginn k utna character uthaya usne aur usko ek packet consider kr
 *   k usko de diya programming language k haath m, aur usne bta diya
 *   ki iske header m XML likha tha, ab aap dekh lo.
 * - Ab programming language usko karegi parse and isme se wo pieces of
 *   information nikaal legi.
 * - To jb v hum server se communicate krte hai ya machine to machine
 *   communication jb v hoti hai to humaari sbse pehli koshish yhi hoti
 *   hai ki kisi Data Interchange Language m baat ho rhi ho, qki most
 *   of the time frontend JS pe likha hota hai aur server kisi aur lang
 *   mai, but XML, JSON, YAML etc Data Interchange Lang jo hai wo JS m 
 *   v smhi jaati hai aur Python/Swift/PHP etc. m smjhi jaati hai
 *   (through in-built or external library).
 * - For Data Exchange, we request in JSON & Backend respond with JSON.
*/

/**
 * Sending response back to Client:
 * In an Express.js application, you send a response back to the client
 * using the 'res'(response) object. The 'res' object provides various
 * methods to send different types of responses, such as text, JSON,
 * HTML, and more. Here are some common ways to send responses back to
 * the client:
 * */ 

/**
 * 1. Sending Plain Text:
 *    Use the 'res.send' method to send plain text.
*/

app.get('/', (req, res) => {
    res.send('Hello, this is a plain text response!');
  });


/**
 * 2. Sending JSON:
 *    Use the 'res.json' method to send a JSON response.
*/

app.get('/api/data', (req, res) => {
  const data = { message: 'This is a JSON response.' };
  res.json(data);
});


/**
 * 3. Sending HTML:
 *    Use the 'res.send' method to send HTML content.
*/

app.get('/html', (req, res) => {
    const htmlContent = '<h1>This is an HTML response</h1>';
    res.send(htmlContent);
  });



/**
 * 4. Redirecting:
 *    Use the 'res.redirect' method to redirect the client to a diff URL.
*/

app.get('/redirect', (req, res) => {
    res.redirect('/new-location');
  });


/**
 * 5. Sending Status Codes:
 *    Use the 'res.status' method to set the HTTP status code. 
*/

app.get('/not-found', (req, res) => {
    res.status(404).send('Page not found');
  });


/**
 * 6. Sending Files:
 *    Use the 'res.sendFile' method to send files. 
 *    We can Download files from the server using this way.
 *    [Link this api with a button to download]
*/

const path = require('path');

app.get('/file', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'example.txt');
  res.sendFile(filePath);
});


/**
 * 7. Sending Headers:
 *    Use the 'res.set' method to set HTTP headers.
*/

app.get('/custom-header', (req, res) => {
    res.set('X-Custom-Header', 'Custom Header Value');
    res.send('Response with a custom header');
  });


/**
 * These examples showcase various ways to send responses back to the
 * client based on different scenarios. The 'res' object provides a
 * versatile set of methods to handle a wide range of responses types.
 * Depending on the use case, you can choose the appropriate method to
 * send the desired response to the client.
*/

/**
 * Summary:
 * Three ways to request for data to the backend: [User - Browser/Postman/Frontend]
 * 1. URL Param
 * 2. Query Param
 * 3. Req Header
 * 4. Req Body
 * 
 * Various types of response data send from backend to frontend:
 * 1. Plain text
 * 2. JSON
 * 3. HTML
 * 4. XML
 * 5. Redirecting to diff page
 * 6. Status Codes
 * 7. Files
 * 8. Headers
 * 9. Binary Data
 *    - Raw Binary Data such as:
 *      a. Images
 *      b. Videos
 *      c. Multimedia Files
 * 
 * Note: We request for data using some in-built API like fetch & axios
 *       and then the backend processes this request and sends back a
 *       response to this API.
*/