/**
 * Challenge-5.1: Create Redux Actions to add entries
 * 1. Create an action creator function named addEntry.
 * 2. Inside addEntry, send a POST request to your backend API to add
 *    a new entry. Make sure to set the appropriate headers and include
 *    the entry data in the request body as JSON.
 * 3. Use await to get the response and parse it as JSON.
 * 4. Check if the response indicates success (you can define your
 *    own success criteria).
 * 5. If the addition is successful, dispatch an action of type
 *    ADD_ENTRY_SUCCESS with the new entry data as the payload.
 * 6. If there's an error, catch it and dispatch an action of type
 *    ADD_ENTRY_FAILURE. 
*/