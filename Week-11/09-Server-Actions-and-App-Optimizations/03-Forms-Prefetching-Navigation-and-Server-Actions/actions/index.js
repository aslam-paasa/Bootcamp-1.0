"use server";

/**
 * getProductData Server Action:
 * > Instead of creating custom backend, we can visit mock API for
 *   testing purpose.
 * > This function simply calling a mock API and returning a list of 
 *   product data.
*/
export async function getProductData(searchQuery, searchType = 'both') {

  /* 1. Fetching Product Data */
  const response = await fetch(
    "https://68a80736bb882f2aa6dd2a10.mockapi.io/api/users/Products"
  );
  const products = await response.json();


  /* 2. Search data: */
  if (!searchQuery || searchQuery.trim() === '') {
    return products;
  }

  const query = searchQuery.toLowerCase().trim();
  const filteredProducts = products.filter(product => {
    const titleMatch = product.title.toLowerCase().includes(query);
    const descMatch = product.desc.toLowerCase().includes(query);

    switch (searchType) {
      case 'title':
        return titleMatch;
      case 'description':
        return descMatch;
      case 'both':
      default:
        return titleMatch || descMatch;
    }
  });

  return filteredProducts;
}