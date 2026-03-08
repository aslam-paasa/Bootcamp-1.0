/**
 * HTTP Status Code:
 * 1. 2xx (Success):
 * => These codes indicate that the request was successful and the server
 *    has processed it as expected.
 * => For example, 200 means "OK," which indicates that the request was 
 *    successful and the server is sending back the requested data.
 * 
 * 2. 3xx (Redirection):
 * => These codes indicate that further action needs to be taken to complete the request. They are often
 *    used for situations where a resource has moved or the client should try a different URL. For
 *    example, 301 means "Moved Permanently," indicating that the requested resource has been
 *    permanently moved to a new location.
 * 
 * 3. 4xx (Client Error):
These codes indicate that the client (usually the user's browser or application) has made a mistake
or the request cannot be fulfilled due to client-side issues. For example, 404 means "Not Found,"
indicating that the requested resource could not be found on the server.
5xx (Server Error):
These codes indicate that the server encountered an error or is incapable of performing the
request. They typically occur when the server is overwhelmed, misconfigured, or experiencing
other technical problems. For example, 500 means "Internal Server Error," indicating that an
unexpected condition was encountered on the server.


n essence:
2xx: Things went well.
3xx: Go somewhere else or take more steps.
4xx: You made a mistake or the requested resource can't be found.
5xx: The server goofed up or can't handle the request.
 * */ 



/**
 * Challenge:
 * challenge
Q1. I deleted a resource on the server? 204 No Content The server successfully deleted the
resource, no response data sent.
Q2. The server is telling me that the method I used is not allowed for this resource? 405 Method
Not Allowed The requested method isn't allowed for this resource.
Q3. I requested data using a method that the server doesn't support for this resource? 501 Not
Implemented The requested method isn't supported by the server.
Q4. The server is refusing to process my request because it's too large? 413 Request Entity Too
Large The request payload is too big for the server to handle.
Q5. The resource I'm trying to access requires authentication and I haven't provided any
credentials? 401 Unauthorized Authentication is needed to access the resource.
Q6. The server successfully processed my request, but there's no data to send back in the
response? 204 No Content Request processed, no response data included.
Q7. I made a request, but the server wants me to pay or subscribe to access this resource? 402
Payment Required Payment is needed to access the resource.
Q8. I requested a resource using a method that the server doesn't recognize? 400 Bad Request
The request has invalid syntax or structure.
Q9. The server cannot handle the request because it's currently overloaded or down for
maintenance? 503 Service Unavailable Server is temporarily unable to handle requests.
Q10. I made a request, but the server wants me to include a specific header in the request? 428
Precondition Required A specific header is necessary for the request
*/