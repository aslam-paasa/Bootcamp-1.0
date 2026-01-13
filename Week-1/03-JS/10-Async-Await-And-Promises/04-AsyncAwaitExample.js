/**
 * Simulated function to fetch data from an API (Replace this with a real API call)
*/
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched!');
    }, 2000); // Simulating a 2-second delay for fetching data
  });
}

/**
 * Using async function to fetch and handle data
*/
async function fetchDataAsync() {
  try {
    console.log('Fetching data...');
    const data = await fetchData(); // Using await to wait for the data to be fetched
    console.log('Data received:', data);
    return data;
  } catch (error) {
    console.log('Error fetching data:', error);
    throw error;
  }
}

/**
 * Calling the async function
*/
fetchDataAsync()
  .then((result) => {
    console.log('Async function completed with result:', result);
  })
  .catch((error) => {
    console.error('Async function failed with error:', error);
  });
