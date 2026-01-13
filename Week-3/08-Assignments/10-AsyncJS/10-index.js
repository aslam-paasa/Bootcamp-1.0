/**
 * Use this URL: https://example.com/getImage to make a fake fetch call
 * which takes a URL and dimensions for the photo to be displayed.
 * Dimensions should be passed in the format(width, height). Show the
 * image provided in the response on DOM.
 * [Dimensions can be 200/300/100. For example, you can pass [200, 300]
 * or [200, 300] etc.
*/


const fakeFetch = (url, dimensions) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://example.com/getImage") {
                resolve({
                    status: 200,
                    data: {
                        image: {
                            link: `https://picsum.photos/${dimensions[0]}/${dimensions[1]}`,
                            title: "Random Image"
                        }
                    }
                });
            } else {
                reject({
                    status: 404,
                    message: "No photo of such dimension found"
                });
            }
        }, 2000);
    });
}


// your code here


// Output on the DOM should be an image.