/**
 * Buffered Response:
 * > Buffered response is a data transfer technique where the server first
 *   loads the entire data into memory, and only after the complete data is
 *   ready, it sends it to the client as a response.
 *
 * > How it works:
 *   - We have a client and a server.
 *   - Suppose we have a very large file or large data that needs to be sent
 *     from the server to the client.
 *   - First, the server loads the entire file/data into its memory.
 *   - After the complete data is loaded and ready, the server sends it as
 *     a response to the client.
 *
 * > Important point:
 *   - The entire data is stored (buffered) in memory before sending.
 *   - The response is sent only after all the data is ready.
 *
 * > Example:
 *   app.get('/buffered-json', async (req, res) => {
 *      const bigDataArray = await fetchSomeBigData();
 *      const jsonResponse = JSON.stringify(bigDataArray);
 *      res.setHeader('Content-Type', 'application/json');
 *      res.send(jsonResponse);
 *   })
 *
 * > Explanation of example:
 *   - fetchSomeBigData() loads the complete data into bigDataArray.
 *   - Until the entire data is fetched and stored, the response is not sent.
 *   - The data is first stored (buffered) in the variable.
 *   - Then it is processed (converted to JSON string).
 *   - After processing, the complete response is sent to the client.
 *
 * > Why buffered response is used:
 *   - When we need to process the complete data before sending it.
 *   - For example, formatting, modifying, or transforming the data.
 *
 * > Example scenario:
 *   - Suppose we fetch 5 records from the database.
 *   - And we want to change a field name in each record.
 *   - First, we store all records in memory.
 *   - Then we loop through them and modify the data.
 *   - After all modifications are done, we send the final response.
 *
 * > Key idea:
 *   - Data is fully stored and processed first,
 *   - Then sent to the client.
 *
 * > This is the most common technique used in normal APIs.
*/

app.get('/buffered-json', async (req, res) => {
    const bigDataArray = await fetchSomeBigData()
    const jsonResponse = JSON.stringify(bigDataArray)
    res.setHeader('Content-Type', 'application/json')
    res.send(jsonResponse)
})
